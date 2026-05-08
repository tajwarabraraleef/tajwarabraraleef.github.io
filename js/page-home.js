(async function () {
  try {
  const dataApi = window.SiteData;
  const SITE_DATA =
    dataApi && typeof dataApi.load === "function"
      ? await dataApi.load([
          "siteManifest",
          "profile",
          "socialLinks",
          "professionalSummary",
          "currentRoles",
          "projects",
          "research",
        ])
      : window.SITE_DATA || {};

  const reduceMotion =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const showcaseState = {
    researchItems: [],
  };

  const defaultDisplayLimits = Object.freeze({
    impactLimit: 3,
    capabilitiesLimit: 6,
    trustLimit: 3,
    showcaseResearchLimit: 4,
    showcaseProjectsLimit: 4,
    careerLimit: 3,
    expertiseLimit: 5,
  });

  function resolveLimit(value, fallback, min = 1, max = 24) {
    const numeric = Number(value);
    if (!Number.isFinite(numeric)) {
      return fallback;
    }

    const bounded = Math.min(max, Math.max(min, Math.floor(numeric)));
    return Number.isFinite(bounded) ? bounded : fallback;
  }

  function getHomeDisplayLimits() {
    const manifest = SITE_DATA.siteManifest && typeof SITE_DATA.siteManifest === "object"
      ? SITE_DATA.siteManifest
      : {};
    const homeDisplay = manifest.homeDisplay && typeof manifest.homeDisplay === "object"
      ? manifest.homeDisplay
      : {};

    return {
      impactLimit: resolveLimit(homeDisplay.impactLimit, defaultDisplayLimits.impactLimit, 1, 12),
      capabilitiesLimit: resolveLimit(homeDisplay.capabilitiesLimit, defaultDisplayLimits.capabilitiesLimit, 1, 12),
      trustLimit: resolveLimit(homeDisplay.trustLimit, defaultDisplayLimits.trustLimit, 1, 12),
      showcaseResearchLimit: resolveLimit(homeDisplay.showcaseResearchLimit, defaultDisplayLimits.showcaseResearchLimit, 1, 12),
      showcaseProjectsLimit: resolveLimit(homeDisplay.showcaseProjectsLimit, defaultDisplayLimits.showcaseProjectsLimit, 1, 12),
      careerLimit: resolveLimit(homeDisplay.careerLimit, defaultDisplayLimits.careerLimit, 1, 12),
      expertiseLimit: resolveLimit(homeDisplay.expertiseLimit, defaultDisplayLimits.expertiseLimit, 1, 12),
    };
  }

  const homeLimits = getHomeDisplayLimits();

  function escapeHtml(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function formatInlineRichText(value = "") {
    const safe = escapeHtml(value);
    return safe.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  }

  function clampText(text = "", max = 180) {
    const clean = String(text || "").replace(/\s+/g, " ").trim();
    if (clean.length <= max) {
      return clean;
    }
    return `${clean.slice(0, max - 1).trimEnd()}...`;
  }

  function isExternalUrl(url = "") {
    return /^(https?:|mailto:|tel:)/i.test(String(url || "").trim());
  }

  function linkAttrs(url = "") {
    return isExternalUrl(url) ? ' target="_blank" rel="noopener noreferrer"' : "";
  }

  function getSocialLink(labelKeyword = "") {
    const links = Array.isArray(SITE_DATA.socialLinks) ? SITE_DATA.socialLinks : [];
    const keyword = String(labelKeyword || "").toLowerCase();
    return links.find((item) => String(item.label || "").toLowerCase().includes(keyword));
  }

  function getMeetingLink() {
    const links = Array.isArray(SITE_DATA.socialLinks) ? SITE_DATA.socialLinks : [];
    return links.find((item) => {
      const label = String(item.label || "").toLowerCase();
      const url = String(item.url || "").toLowerCase();
      return label.includes("meeting") || label.includes("book") || url.includes("calendly");
    });
  }

  function parseCountMeta(value = "") {
    const raw = String(value || "").trim();
    const match = raw.match(/[\d,.]+/);
    if (!match) {
      return null;
    }

    const target = Number(match[0].replace(/,/g, ""));
    if (!Number.isFinite(target)) {
      return null;
    }

    const decimals = (match[0].split(".")[1] || "").length;
    return {
      target,
      decimals,
      prefix: raw.slice(0, match.index),
      suffix: raw.slice((match.index || 0) + match[0].length),
    };
  }

  function formatCount(value, decimals) {
    if (!Number.isFinite(value)) {
      return "0";
    }
    if (decimals > 0) {
      return value.toLocaleString("en-US", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      });
    }
    return Math.round(value).toLocaleString("en-US");
  }

  function getFeaturedItems(items = [], limit = 4) {
    if (!Array.isArray(items) || !items.length) {
      return [];
    }

    const explicit = items.filter((item) => item && item.homeFeatured === true);
    const fallbackFeatured = items.filter((item) => item && item.featured && item.homeFeatured !== true);
    const remaining = items.filter((item) => item && item.homeFeatured !== true && !item.featured);

    return [...explicit, ...fallbackFeatured, ...remaining].slice(0, limit);
  }

  function getResearchUrl(item = {}) {
    const links = Array.isArray(item.links) ? item.links : [];
    const paper = links.find((link) => String(link.kind || "").toLowerCase() === "paper");
    if (paper && paper.url) {
      return paper.url;
    }
    if (links[0] && links[0].url) {
      return links[0].url;
    }
    return "research.html";
  }

  function getProjectUrl(item = {}) {
    const links = Array.isArray(item.links) ? item.links : [];
    const preferred = links.find((link) => {
      const kind = String(link.kind || "").toLowerCase();
      return kind === "media" || kind === "code" || kind === "resource";
    });
    if (preferred && preferred.url) {
      return preferred.url;
    }
    if (links[0] && links[0].url) {
      return links[0].url;
    }
    return "projects.html";
  }

  function renderHero() {
    const profile = SITE_DATA.profile || {};
    const summary = SITE_DATA.professionalSummary || {};
    const socialLinks = Array.isArray(SITE_DATA.socialLinks) ? SITE_DATA.socialLinks : [];

    const nameEl = document.getElementById("home-hero-name");
    const roleEl = document.getElementById("home-hero-role");
    const headlineEl = document.getElementById("home-hero-headline");
    const subheadlineEl = document.getElementById("home-hero-subheadline");
    const availabilityEl = document.getElementById("home-hero-availability");
    const expertiseEl = document.getElementById("home-hero-expertise");
    const ctasEl = document.getElementById("home-hero-ctas");
    const imageEl = document.getElementById("home-hero-image");
    const socialEl = document.getElementById("home-social-links");

    if (nameEl) {
      nameEl.textContent = profile.name || "";
    }

    const roleLine = [profile.role || "", profile.organization || ""]
      .filter(Boolean)
      .join(" / ");
    if (roleEl) {
      roleEl.textContent = roleLine;
    }

    const headline = profile.headline || summary.headline || "";
    if (headlineEl) {
      headlineEl.innerHTML = formatInlineRichText(headline);
    }

    const subheadline = profile.subheadline || clampText(summary.blurb || "", 250);
    if (subheadlineEl) {
      subheadlineEl.innerHTML = formatInlineRichText(subheadline);
    }

    const availability = profile.availability || "";
    if (availabilityEl) {
      availabilityEl.textContent = availability;
    }

    const expertise = Array.isArray(profile.expertise) && profile.expertise.length
      ? profile.expertise.slice(0, homeLimits.expertiseLimit)
      : [];

    if (expertiseEl) {
      expertiseEl.innerHTML = expertise
        .map((item) => `<li class="home-expertise-pill">${escapeHtml(item)}</li>`)
        .join("");
    }

    const emailLink = getSocialLink("email");
    const linkedInLink = getSocialLink("linkedin");
    const emailUrl = emailLink && emailLink.url ? emailLink.url : "mailto:tajwaraleef@ece.ubc.ca";
    const linkedInUrl =
      (linkedInLink && linkedInLink.url) ||
      "https://www.linkedin.com/in/tajwar-abrar-aleef/";

    if (ctasEl) {
      const meetingLink = getMeetingLink();
      const meetingUrl = meetingLink && meetingLink.url ? meetingLink.url : emailUrl;
      ctasEl.innerHTML = `
        <a class="home-cta home-cta--large home-cta--linkedin" href="${escapeHtml(linkedInUrl)}" target="_blank" rel="noopener noreferrer">
          <span class="home-cta__icon" aria-hidden="true"><i class="fa-brands fa-linkedin-in"></i></span>
          <span class="home-cta__label">Connect on LinkedIn</span>
        </a>
        <a class="home-cta home-cta--large home-cta--meeting" href="${escapeHtml(meetingUrl)}"${linkAttrs(meetingUrl)}>
          <span class="home-cta__icon" aria-hidden="true"><i class="fa-regular fa-calendar-check"></i></span>
          <span class="home-cta__label">Book a Meeting</span>
        </a>
      `;
    }

    if (imageEl) {
      imageEl.src = profile.heroImage || "images/white_background.png";
      imageEl.alt = profile.heroAlt || profile.name || "";
    }

    if (socialEl) {
      socialEl.innerHTML = socialLinks
        .map((item) => {
          const url = escapeHtml(item.url || "#");
          const label = escapeHtml(item.label || "");
          const icon = escapeHtml(item.icon || "fa-solid fa-link");
          const attrs = isExternalUrl(item.url) ? ' target="_blank" rel="noopener noreferrer"' : "";
          return `<a href="${url}"${attrs} aria-label="${label}" title="${label}"><i class="${icon}" aria-hidden="true"></i></a>`;
        })
        .join("");
    }
  }

  function renderImpactStrip() {
    const summary = SITE_DATA.professionalSummary || {};
    const container = document.getElementById("home-impact-strip");
    if (!container) {
      return;
    }

    const metrics = Array.isArray(summary.metrics) && summary.metrics.length
      ? summary.metrics.slice(0, homeLimits.impactLimit)
      : [];

    if (!metrics.length) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = metrics
      .map((item, index) => {
        const rawValue = String(item.value || "");
        const countMeta = parseCountMeta(rawValue);
        const countAttrs = countMeta
          ? ` data-count-target="${countMeta.target}" data-count-prefix="${escapeHtml(
              countMeta.prefix
            )}" data-count-suffix="${escapeHtml(countMeta.suffix)}" data-count-decimals="${countMeta.decimals}"`
          : "";

        return `<article class="home-impact-card" data-reveal style="transition-delay:${index * 60}ms;">
          <p class="home-impact-value"${countAttrs}>${escapeHtml(rawValue)}</p>
          <p class="home-impact-label">${formatInlineRichText(item.label || "")}</p>
          <p class="home-impact-detail">${formatInlineRichText(item.detail || "")}</p>
        </article>`;
      })
      .join("");

    if (typeof window.refreshRevealAnimations === "function") {
      window.refreshRevealAnimations(container);
    }

    animateImpactCounters();
  }

  function animateImpactCounters() {
    if (reduceMotion) {
      return;
    }

    const values = Array.from(
      document.querySelectorAll(".home-impact-value[data-count-target]:not([data-count-bound])")
    );

    if (!values.length) {
      return;
    }

    function runCount(el) {
      if (el.dataset.countDone === "true") {
        return;
      }

      el.dataset.countDone = "true";
      const target = Number(el.dataset.countTarget || 0);
      const decimals = Number(el.dataset.countDecimals || 0);
      const prefix = el.dataset.countPrefix || "";
      const suffix = el.dataset.countSuffix || "";
      const duration = 1200;
      const start = performance.now();

      function frame(now) {
        const progress = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = target * eased;
        el.textContent = `${prefix}${formatCount(current, decimals)}${suffix}`;

        if (progress < 1) {
          requestAnimationFrame(frame);
        } else {
          el.textContent = `${prefix}${formatCount(target, decimals)}${suffix}`;
        }
      }

      requestAnimationFrame(frame);
    }

    if (!("IntersectionObserver" in window)) {
      values.forEach((el) => runCount(el));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          runCount(entry.target);
          obs.unobserve(entry.target);
        });
      },
      {
        threshold: 0.45,
      }
    );

    values.forEach((el) => {
      el.setAttribute("data-count-bound", "true");
      observer.observe(el);
    });
  }

  function toCapabilityCard(item, index) {
    const icons = [
      "fa-solid fa-brain",
      "fa-solid fa-database",
      "fa-solid fa-network-wired",
      "fa-solid fa-wave-square",
      "fa-solid fa-shield-heart",
      "fa-solid fa-chart-line",
    ];

    if (item && typeof item === "object") {
      return {
        title: String(item.title || ""),
        detail: String(item.detail || item.description || ""),
        icon: String(item.icon || icons[index % icons.length]),
      };
    }

    const text = String(item || "").trim();
    return {
      title: text,
      detail: "",
      icon: icons[index % icons.length],
    };
  }

  function renderCapabilities() {
    const profile = SITE_DATA.profile || {};
    const summary = SITE_DATA.professionalSummary || {};
    const container = document.getElementById("home-capabilities-grid");

    if (!container) {
      return;
    }

    const suppliedProps = Array.isArray(summary.valueProps) ? summary.valueProps : [];
    const source = suppliedProps.slice(0, homeLimits.capabilitiesLimit);
    const expertise = Array.isArray(profile.expertise) ? profile.expertise : [];
    const capabilityItems = source.map((item, index) => toCapabilityCard(item, index));

    if (!source.length && expertise.length) {
      expertise.slice(0, Math.min(2, homeLimits.capabilitiesLimit)).forEach((item, index) => {
        capabilityItems.push(
          toCapabilityCard(
            {
              title: item,
              detail: "",
            },
            capabilityItems.length + index
          )
        );
      });
    }

    const visibleItems = capabilityItems
      .filter((item) => item && (item.title || item.detail))
      .slice(0, homeLimits.capabilitiesLimit);

    if (!visibleItems.length) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = visibleItems
      .map((item, index) => `<article class="home-capability-card" data-reveal style="transition-delay:${index * 45}ms;">
        <p class="home-capability-icon"><i class="${escapeHtml(item.icon)}" aria-hidden="true"></i></p>
        <h3>${formatInlineRichText(item.title)}</h3>
        <p>${formatInlineRichText(clampText(item.detail, 150))}</p>
      </article>`)
      .join("");

    if (typeof window.refreshRevealAnimations === "function") {
      window.refreshRevealAnimations(container);
    }
  }

  function renderTrustGrid() {
    const roles = Array.isArray(SITE_DATA.currentRoles) ? SITE_DATA.currentRoles : [];
    const container = document.getElementById("home-trust-grid");

    if (!container) {
      return;
    }

    if (!roles.length) {
      container.innerHTML = "";
      return;
    }

    container.innerHTML = roles.slice(0, homeLimits.trustLimit)
      .map((item, index) => {
        const badge = item.trustBadge || "";
        const description = clampText(item.homeDescription || "", 150);
        const website = escapeHtml(item.website || "#");
        const attrs = isExternalUrl(item.website || "") ? ' target="_blank" rel="noopener noreferrer"' : "";

        return `<a class="home-trust-card" href="${website}"${attrs} data-reveal style="transition-delay:${index * 60}ms;" aria-label="Open ${escapeHtml(
          item.org || ""
        )}">
          <div class="home-trust-logo-shell">
            <img src="${escapeHtml(item.logo || "images/white_background.png")}" alt="${escapeHtml(
              item.org || ""
            )} logo" loading="lazy" data-fallback="images/white_background.png">
          </div>
          <p class="home-trust-badge">${escapeHtml(badge)}</p>
          <h3>${escapeHtml(item.org || "")}</h3>
          <p class="home-trust-role">${escapeHtml(item.role || "")}</p>
          <p class="home-trust-meta">${escapeHtml([item.period || "", item.location || ""].filter(Boolean).join(" / "))}</p>
          <p class="home-trust-desc">${formatInlineRichText(description)}</p>
        </a>`;
      })
      .join("");

    if (typeof window.refreshRevealAnimations === "function") {
      window.refreshRevealAnimations(container);
    }
    if (typeof window.refreshImageFallbacks === "function") {
      window.refreshImageFallbacks(container);
    }
  }

  function showcaseCard(item, kind = "research") {
    const isResearch = kind === "research";
    const title = escapeHtml(item.title || "");
    const year = escapeHtml(item.year || "");
    const secondaryMeta = isResearch
      ? escapeHtml(item.venue || "")
      : escapeHtml(item.category || "");
    const meta = secondaryMeta ? `${year} / ${secondaryMeta}` : year;
    const summary = clampText(item.summary || item.description || "", 145);
    const primaryImage = escapeHtml(item.primaryImage || "images/white_background.png");
    const secondaryImage = escapeHtml(item.secondaryImage || item.primaryImage || "images/white_background.png");
    const url = isResearch ? getResearchUrl(item) : getProjectUrl(item);
    const safeUrl = escapeHtml(url || "#");
    const ctaLabel = isResearch ? "Open Paper" : "Open Project";

    return `<a class="home-showcase-card" href="${safeUrl}"${linkAttrs(url)} data-reveal>
      <div class="home-showcase-media">
        <img src="${primaryImage}" alt="${title} visual" loading="lazy" data-fallback="images/white_background.png">
        <img class="secondary" src="${secondaryImage}" alt="${title} alternate visual" loading="lazy" data-fallback="${primaryImage}">
      </div>
      <div class="home-showcase-copy">
        <p class="home-showcase-meta">${meta}</p>
        <h3>${title}</h3>
        <p>${formatInlineRichText(summary)}</p>
        <span class="home-showcase-cta">${ctaLabel} <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i></span>
      </div>
    </a>`;
  }

  function renderShowcase() {
    const container = document.getElementById("home-showcase-grid");
    const moreLink = document.getElementById("home-showcase-more");

    if (!container) {
      return;
    }

    const items = showcaseState.researchItems;

    if (!items.length) {
      container.innerHTML = "";
    } else {
      container.innerHTML = `<div class="home-showcase-grid-inner">
        ${items.map((item) => showcaseCard(item, "research")).join("")}
      </div>`;
    }

    if (moreLink) {
      moreLink.href = "research.html";
      moreLink.innerHTML = 'View all research <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>';
    }

    if (typeof window.refreshImageFallbacks === "function") {
      window.refreshImageFallbacks(container);
    }
    if (typeof window.refreshRevealAnimations === "function") {
      window.refreshRevealAnimations(container);
    }
    if (typeof window.refreshScrollCue === "function") {
      window.refreshScrollCue();
    }
  }

  function renderCareerSnapshot() {
    const roles = Array.isArray(SITE_DATA.currentRoles) ? SITE_DATA.currentRoles : [];
    const container = document.getElementById("home-career-timeline");

    if (!container) {
      return;
    }

    if (!roles.length) {
      container.innerHTML = "";
      return;
    }

    const currentRole =
      roles.find((item) => /present/i.test(String(item.period || "")) && !/university of british columbia/i.test(String(item.org || ""))) ||
      roles[0];
    const phdRole =
      roles.find((item) => /phd/i.test(String(item.role || "")) || /university of british columbia/i.test(String(item.org || ""))) ||
      roles[1] ||
      roles[0];
    const startupRole =
      roles.find((item) => /co-founder/i.test(String(item.role || "")) || /omnisync/i.test(String(item.org || ""))) ||
      roles[2] ||
      roles[0];

    const selected = [];
    [currentRole, phdRole, startupRole].forEach((item) => {
      if (item && !selected.some((entry) => entry.id === item.id)) {
        selected.push(item);
      }
    });

    roles.forEach((item) => {
      if (selected.length >= homeLimits.careerLimit) {
        return;
      }
      if (!selected.some((entry) => entry.id === item.id)) {
        selected.push(item);
      }
    });

    container.innerHTML = selected.slice(0, homeLimits.careerLimit)
      .map((item, index) => {
        const descriptor = clampText(item.homeDescription || "", 160);
        return `<article class="home-career-node" data-reveal style="transition-delay:${index * 70}ms;">
          <p class="home-career-node__period">${escapeHtml(item.period || "")}</p>
          <h3>${escapeHtml(item.role || "")}</h3>
          <p class="home-career-node__org">${escapeHtml(item.org || "")}</p>
          <p class="home-career-node__desc">${formatInlineRichText(descriptor)}</p>
        </article>`;
      })
      .join("");

    if (typeof window.refreshRevealAnimations === "function") {
      window.refreshRevealAnimations(container);
    }
  }

  function renderFinalCta() {
    const profile = SITE_DATA.profile || {};
    const summary = SITE_DATA.professionalSummary || {};
    const finalCopy = document.getElementById("home-final-copy");
    const actions = document.getElementById("home-final-actions");

    if (finalCopy) {
      finalCopy.innerHTML =
        formatInlineRichText(
        profile.availability ||
        clampText(summary.blurb || "", 220)
        );
    }

    if (!actions) {
      return;
    }

    const email = getSocialLink("email");
    const linkedIn = getSocialLink("linkedin");
    const emailUrl = email && email.url ? email.url : "mailto:tajwaraleef@ece.ubc.ca";
    const linkedInUrl =
      (linkedIn && linkedIn.url) ||
      "https://www.linkedin.com/in/tajwar-abrar-aleef/";
    const meetingLink = getMeetingLink();
    const meetingUrl = meetingLink && meetingLink.url ? meetingLink.url : emailUrl;

    actions.innerHTML = `
      <a class="home-cta home-cta--large home-cta--linkedin" href="${escapeHtml(linkedInUrl)}" target="_blank" rel="noopener noreferrer">
        <span class="home-cta__icon" aria-hidden="true"><i class="fa-brands fa-linkedin-in"></i></span>
        <span class="home-cta__label">Connect on LinkedIn</span>
      </a>
      <a class="home-cta home-cta--large home-cta--meeting" href="${escapeHtml(meetingUrl)}"${linkAttrs(meetingUrl)}>
        <span class="home-cta__icon" aria-hidden="true"><i class="fa-regular fa-calendar-check"></i></span>
        <span class="home-cta__label">Book a Meeting</span>
      </a>
    `;
  }

  function setupHeroParallax() {
    if (reduceMotion) {
      return;
    }

    const heroCard = document.querySelector(".home-hero-card");
    if (!heroCard) {
      return;
    }

    const layers = Array.from(heroCard.querySelectorAll("[data-parallax]"));
    if (!layers.length) {
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId = null;

    function updateLayers() {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;

      layers.forEach((layer) => {
        const strength = Number(layer.dataset.parallax || 0.08);
        const offsetX = currentX * 34 * strength;
        const offsetY = currentY * 24 * strength;
        layer.style.transform = `translate3d(${offsetX.toFixed(2)}px, ${offsetY.toFixed(2)}px, 0)`;
      });

      if (Math.abs(targetX - currentX) > 0.002 || Math.abs(targetY - currentY) > 0.002) {
        rafId = requestAnimationFrame(updateLayers);
      } else {
        rafId = null;
      }
    }

    function requestTick() {
      if (rafId) {
        return;
      }
      rafId = requestAnimationFrame(updateLayers);
    }

    heroCard.addEventListener("pointermove", (event) => {
      const rect = heroCard.getBoundingClientRect();
      if (!rect.width || !rect.height) {
        return;
      }

      const normalizedX = (event.clientX - rect.left) / rect.width - 0.5;
      const normalizedY = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = normalizedX;
      targetY = normalizedY;
      requestTick();
    });

    heroCard.addEventListener("pointerleave", () => {
      targetX = 0;
      targetY = 0;
      requestTick();
    });
  }

  function bootstrapHome() {
    showcaseState.researchItems = getFeaturedItems(
      Array.isArray(SITE_DATA.research) ? SITE_DATA.research : [],
      homeLimits.showcaseResearchLimit
    );
    renderHero();
    renderImpactStrip();
    renderCapabilities();
    renderTrustGrid();
    renderShowcase();
    renderCareerSnapshot();
    renderFinalCta();
    setupHeroParallax();

    if (typeof window.refreshImageFallbacks === "function") {
      window.refreshImageFallbacks(document);
    }
    if (typeof window.refreshRevealAnimations === "function") {
      window.refreshRevealAnimations(document);
    }
    if (typeof window.refreshScrollCue === "function") {
      window.refreshScrollCue();
    }
  }

    bootstrapHome();
  } finally {
    document.documentElement.classList.remove("js-page-pending");
  }
})();
