const PLACEHOLDER_IMAGE = "images/white_background.png";

function toElement(containerId) {
  if (typeof containerId === "string") {
    return document.getElementById(containerId);
  }
  return containerId || null;
}

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

function linkPill(link) {
  const label = escapeHtml(link.label || "Link");
  const url = escapeHtml(link.url || "#");
  const kind = escapeHtml(link.kind || "link");
  return `<a class="link-pill link-pill--${kind} external-link-button" href="${url}" target="_blank" rel="noopener noreferrer"><span>${label}</span><i class="fa-solid fa-arrow-up-right-from-square external-link-icon" aria-hidden="true"></i></a>`;
}

function tagPill(tag) {
  return `<span class="tag-pill">${escapeHtml(tag)}</span>`;
}

function projectCard(item, options = {}) {
  const year = item.year ? String(item.year) : "";
  const category = String(item.category || "").trim();
  const copy = options.compact ? item.summary : item.description;
  const links = (item.links || []).map(linkPill).join("");
  const tags = (item.tags || []).map(tagPill).join("");
  const title = escapeHtml(item.title || "Project");
  const id = escapeHtml(item.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
  const alt = `${title} visual`;
  const primaryImage = escapeHtml(item.primaryImage || PLACEHOLDER_IMAGE);
  const secondaryImage = escapeHtml(item.secondaryImage || item.primaryImage || PLACEHOLDER_IMAGE);
  const meta = category ? `${year} / ${category}` : year;
  const researchStyleCardClass = options.researchStyle ? " work-card--research work-card--project" : "";
  const accessibilityAttrs = options.researchStyle
    ? ` data-project-id="${id}" tabindex="0" aria-label="Open project details for ${title}" aria-haspopup="dialog"`
    : "";

  return `
    <article class="work-card${researchStyleCardClass}" data-reveal${accessibilityAttrs}>
      <div class="media-stack">
        <img src="${primaryImage}" alt="${escapeHtml(alt)}" loading="lazy" data-fallback="${PLACEHOLDER_IMAGE}">
        <img class="secondary" src="${secondaryImage}" alt="${escapeHtml(alt)} alternate" loading="lazy" data-fallback="${primaryImage}">
      </div>
      <div class="work-body">
        <p class="work-meta">${escapeHtml(meta)}</p>
        <h3>${title}</h3>
        <p>${formatInlineRichText(copy || "Description coming soon.")}</p>
        <div class="tag-row">${tags}</div>
        <div class="link-row">${links}</div>
      </div>
    </article>
  `;
}

function researchCard(item, options = {}) {
  const year = item.year ? String(item.year) : "Research";
  const copy = options.compact ? item.summary : item.description;
  const links = (item.links || []).map(linkPill).join("");
  const tags = (item.tags || []).map(tagPill).join("");
  const title = escapeHtml(item.title || "Research Work");
  const id = escapeHtml(item.id || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"));
  const venue = escapeHtml(item.venue || "Publication");
  const alt = `${title} figure`;
  const primaryImage = escapeHtml(item.primaryImage || PLACEHOLDER_IMAGE);
  const secondaryImage = escapeHtml(item.secondaryImage || item.primaryImage || PLACEHOLDER_IMAGE);

  return `
    <article class="work-card work-card--research" data-reveal data-research-id="${id}" tabindex="0" aria-label="Open research details for ${title}" aria-haspopup="dialog">
      <div class="media-stack">
        <img src="${primaryImage}" alt="${escapeHtml(alt)}" loading="lazy" data-fallback="${PLACEHOLDER_IMAGE}">
        <img class="secondary" src="${secondaryImage}" alt="${escapeHtml(alt)} alternate" loading="lazy" data-fallback="${primaryImage}">
      </div>
      <div class="work-body">
        <p class="work-meta">${escapeHtml(year)} - ${venue}</p>
        <h3>${title}</h3>
        <p>${formatInlineRichText(copy || "Summary coming soon.")}</p>
        <div class="tag-row">${tags}</div>
        <div class="link-row">${links}</div>
      </div>
    </article>
  `;
}

const GALLERY_LAYOUT_OPTIONS = new Set(["square", "medium", "tall", "wide", "hero"]);

function normalizeGalleryLayout(value) {
  const raw = String(value || "").trim().toLowerCase();
  return GALLERY_LAYOUT_OPTIONS.has(raw) ? raw : "";
}

function resolveGalleryLayout(item, index) {
  const explicitLayout = normalizeGalleryLayout(item.layout);
  if (explicitLayout) {
    return explicitLayout;
  }

  if (index % 11 === 0) {
    return "hero";
  }

  if (index % 7 === 0) {
    return "wide";
  }

  if (index % 4 === 0) {
    return "tall";
  }

  return item.type === "video" ? "medium" : "square";
}

function galleryCard(item, index) {
  const mediaType = item.type === "video" ? "video" : "image";
  const rawTitle = String(item.title || item.caption || "Gallery media").trim() || "Gallery media";
  const rawAlt = rawTitle;
  const rawCaption = String(item.caption || rawTitle || "").trim();
  const rawCategory = String(item.category || "Personal").trim() || "Personal";
  const rawSource = String(item.src || PLACEHOLDER_IMAGE).trim() || PLACEHOLDER_IMAGE;
  const layout = resolveGalleryLayout(item, index);
  const triggerLabel = mediaType === "video" ? `Open video: ${rawTitle}` : `Open image: ${rawTitle}`;

  const title = escapeHtml(rawTitle);
  const alt = escapeHtml(rawAlt);
  const caption = escapeHtml(rawCaption);
  const category = escapeHtml(rawCategory);
  const src = escapeHtml(rawSource);

  return `
    <article class="gallery-card gallery-card--${layout} gallery-card--${mediaType}" data-reveal data-gallery-category="${category}">
      <button class="gallery-trigger" type="button" aria-label="${escapeHtml(triggerLabel)}" data-media-type="${mediaType}" data-src="${src}" data-alt="${alt}" data-caption="${caption}" data-title="${title}">
        <div class="gallery-media">
          ${
            mediaType === "video"
              ? `<video class="gallery-media-asset" preload="metadata" muted playsinline src="${src}" aria-hidden="true"></video>
            <span class="gallery-video-badge" aria-hidden="true"><i class="fa-solid fa-play"></i></span>`
              : `<img class="gallery-media-asset" src="${src}" alt="${alt}" loading="lazy" data-fallback="${PLACEHOLDER_IMAGE}">`
          }
          <div class="gallery-overlay">
            <p class="gallery-title">${title}</p>
          </div>
        </div>
      </button>
    </article>
  `;
}

function renderFailure(container, message) {
  if (!container) {
    return false;
  }

  container.innerHTML = `<div class="empty-state" role="status">${escapeHtml(message)}</div>`;
  return false;
}

function activateEnhancements(container) {
  if (!container) {
    return;
  }

  if (typeof window !== "undefined" && typeof window.refreshImageFallbacks === "function") {
    window.refreshImageFallbacks(container);
  }

  if (typeof window !== "undefined" && typeof window.refreshLightboxTriggers === "function") {
    window.refreshLightboxTriggers(container);
  }

  if (typeof window !== "undefined" && typeof window.refreshRevealAnimations === "function") {
    window.refreshRevealAnimations(container);
  } else {
    container.querySelectorAll("[data-reveal]").forEach((item) => item.classList.add("is-visible"));
  }

  if (typeof window !== "undefined" && typeof window.refreshScrollCue === "function") {
    window.refreshScrollCue();
  }
}

function groupByYear(items = []) {
  return items.reduce((acc, item) => {
    const year = item.year || "Other";
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(item);
    return acc;
  }, {});
}

function getTagSet(items = []) {
  const tags = new Set();
  items.forEach((item) => {
    (item.tags || []).forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

function renderProjects(containerId, items = [], options = {}) {
  try {
    const container = toElement(containerId);
    if (!container) {
      return false;
    }

    if (!Array.isArray(items) || !items.length) {
      return renderFailure(container, options.emptyMessage || "No projects available yet.");
    }

    const list = options.limit ? items.slice(0, options.limit) : items;
    const html = list.map((item) => projectCard(item, options)).join("");
    const gridClass = options.researchStyle ? "cards-grid cards-grid--research" : "cards-grid";
    container.innerHTML = `<div class="${gridClass}">${html}</div>`;
    activateEnhancements(container);
    return true;
  } catch (error) {
    const container = toElement(containerId);
    return renderFailure(container, "Unable to render projects right now.");
  }
}

function renderResearch(containerId, items = [], options = {}) {
  try {
    const container = toElement(containerId);
    if (!container) {
      return false;
    }

    if (!Array.isArray(items) || !items.length) {
      return renderFailure(container, options.emptyMessage || "No research entries available yet.");
    }

    const list = options.limit ? items.slice(0, options.limit) : items;
    const html = list.map((item) => researchCard(item, options)).join("");
    container.innerHTML = `<div class="cards-grid cards-grid--research">${html}</div>`;
    activateEnhancements(container);
    return true;
  } catch (error) {
    const container = toElement(containerId);
    return renderFailure(container, "Unable to render research entries right now.");
  }
}

function renderGallery(containerId, mediaItems = []) {
  try {
    const container = toElement(containerId);
    if (!container) {
      return false;
    }

    if (!Array.isArray(mediaItems) || !mediaItems.length) {
      return renderFailure(container, "Gallery is being prepared.");
    }

    const html = mediaItems.map((item, index) => galleryCard(item, index)).join("");
    container.innerHTML = `<div class="gallery-grid gallery-grid--masonry">${html}</div>`;
    activateEnhancements(container);
    return true;
  } catch (error) {
    const container = toElement(containerId);
    return renderFailure(container, "Unable to render gallery media right now.");
  }
}

window.SiteRender = {
  groupByYear,
  getTagSet,
  renderProjects,
  renderResearch,
  renderGallery,
};
