(async function () {
  try {
  const dataApi = window.SiteData;
  const SITE_DATA =
    dataApi && typeof dataApi.load === "function"
      ? await dataApi.load(["professionalSummary", "currentRoles", "experience", "education"])
      : window.SITE_DATA || {};

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

  function renderSummary() {
    const summary = SITE_DATA.professionalSummary || {};
    const headline = document.getElementById("experience-summary-headline");
    const blurb = document.getElementById("experience-summary-blurb");
    const metrics = document.getElementById("experience-metrics");

    if (headline) {
      headline.innerHTML = formatInlineRichText(summary.headline || "");
    }
    if (blurb) {
      blurb.innerHTML = formatInlineRichText(summary.blurb || "");
    }

    if (!metrics) {
      return;
    }

    const items = Array.isArray(summary.metrics) ? summary.metrics : [];
    if (!items.length) {
      metrics.innerHTML = '<div class="empty-state">Metrics will be added soon.</div>';
      return;
    }

    metrics.innerHTML = items
      .map(
        (item) => `<article class="metric-card" data-reveal>
          <p class="metric-value">${escapeHtml(item.value || "")}</p>
          <p class="metric-label">${formatInlineRichText(item.label || "")}</p>
          <p class="metric-detail">${formatInlineRichText(item.detail || "")}</p>
        </article>`
      )
      .join("");
  }

  function roleCard(item) {
    const summary = String(item.homeDescription || "").trim();

    return `<article class="role-card" data-reveal>
      <header class="role-card-top">
        <img class="role-logo" src="${escapeHtml(item.logo || "images/white_background.png")}" alt="${escapeHtml(item.org || "Organization")} logo" loading="lazy" data-fallback="images/white_background.png">
        <div>
          <p class="role-org">${escapeHtml(item.org || "")}</p>
          <h3>${escapeHtml(item.role || "")}</h3>
          <p class="role-meta">${escapeHtml(item.location || "")} - ${escapeHtml(item.period || "")}</p>
        </div>
      </header>
      ${summary ? `<p class="role-meta">${formatInlineRichText(summary)}</p>` : ""}
    </article>`;
  }

  function renderCurrentRoles() {
    const container = document.getElementById("experience-current-roles");
    if (!container) {
      return;
    }

    const roles = Array.isArray(SITE_DATA.currentRoles) ? SITE_DATA.currentRoles : [];
    if (!roles.length) {
      container.innerHTML = '<div class="empty-state">Current roles are being updated.</div>';
      return;
    }

    container.innerHTML = roles.map(roleCard).join("");
  }

  function toYear(value, fallback) {
    if (!value || value === "Present") {
      return fallback;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function renderTimeline() {
    const container = document.getElementById("experience-timeline");
    if (!container) {
      return;
    }

    const entries = Array.isArray(SITE_DATA.experience) ? [...SITE_DATA.experience] : [];
    if (!entries.length) {
      container.innerHTML = '<div class="empty-state">Experience timeline is being prepared.</div>';
      return;
    }

    const currentYear = new Date().getFullYear();
    entries.sort((a, b) => {
      const endA = toYear(a.end, currentYear + 1);
      const endB = toYear(b.end, currentYear + 1);
      if (endA !== endB) {
        return endB - endA;
      }
      return toYear(b.start, 0) - toYear(a.start, 0);
    });

    container.innerHTML = entries
      .map((item) => {
        const bullets = (item.bullets || [])
          .map((line) => `<li>${formatInlineRichText(line)}</li>`)
          .join("");
        const metrics = (item.metrics || [])
          .map((metric) => `<span class="tag-pill">${escapeHtml(metric)}</span>`)
          .join("");
        const tech = (item.tech || [])
          .map((tool) => `<span class="tag-pill">${escapeHtml(tool)}</span>`)
          .join("");
        const logo = escapeHtml(item.logo || "images/white_background.png");

        return `<article class="timeline-item" data-reveal>
          <div class="timeline-marker" aria-hidden="true"></div>
          <div class="timeline-body">
            <span class="timeline-entry-logo" aria-hidden="true">
              <img src="${logo}" alt="" loading="lazy" data-fallback="images/white_background.png">
            </span>
            <p class="timeline-meta">${escapeHtml(item.start || "")} - ${escapeHtml(item.end || "")} / ${escapeHtml(item.location || "")}</p>
            <h3>${escapeHtml(item.role || "")}</h3>
            <p class="timeline-org">${escapeHtml(item.org || "")}</p>
            <ul class="timeline-highlights">${bullets}</ul>
            <div class="timeline-tags">
              <p>Impact</p>
              <div class="tag-row">${metrics}</div>
            </div>
            <div class="timeline-tags">
              <p>Tech</p>
              <div class="tag-row">${tech}</div>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  function renderEducation() {
    const container = document.getElementById("experience-education");
    if (!container) {
      return;
    }

    const items = Array.isArray(SITE_DATA.education) ? SITE_DATA.education : [];
    if (!items.length) {
      container.innerHTML = '<div class="empty-state">Education details are being updated.</div>';
      return;
    }

    container.innerHTML = items
      .map((item) => {
        const highlights = (item.highlights || [])
          .map((line) => `<li>${formatInlineRichText(line)}</li>`)
          .join("");

        return `<article class="education-card" data-reveal>
          <h3>${escapeHtml(item.degree || "")}</h3>
          <p class="education-meta">${escapeHtml(item.institution || "")} / ${escapeHtml(item.location || "")} / ${escapeHtml(item.period || "")}</p>
          <ul class="education-highlights">${highlights}</ul>
        </article>`;
      })
      .join("");
  }

  renderSummary();
  renderCurrentRoles();
  renderTimeline();
  renderEducation();

  if (typeof window.refreshImageFallbacks === "function") {
    window.refreshImageFallbacks(document.getElementById("experience-current-roles"));
    window.refreshImageFallbacks(document.getElementById("experience-timeline"));
  }
  if (typeof window.refreshRevealAnimations === "function") {
    window.refreshRevealAnimations(document.getElementById("experience-metrics"));
    window.refreshRevealAnimations(document.getElementById("experience-current-roles"));
    window.refreshRevealAnimations(document.getElementById("experience-timeline"));
    window.refreshRevealAnimations(document.getElementById("experience-education"));
  }
  } finally {
    document.documentElement.classList.remove("js-page-pending");
  }
})();
