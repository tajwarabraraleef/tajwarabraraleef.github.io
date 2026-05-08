(async function () {
  try {
  const dataApi = window.SiteData;
  const SITE_DATA =
    dataApi && typeof dataApi.load === "function"
      ? await dataApi.load(["gallery"])
      : window.SITE_DATA || {};
  const { renderGallery } = window.SiteRender;

  const galleryContainer = document.getElementById("gallery-container");
  const filtersContainer = document.getElementById("gallery-filters");
  const gallery = Array.isArray(SITE_DATA.gallery) ? SITE_DATA.gallery : [];
  const FILTER_ALL = "All";
  const FILTER_VIDEO = "Video";
  const DEFAULT_CATEGORY = "Personal";
  const BASE_CATEGORY_ORDER = ["Research", "Projects", "Travel", "Personal"];

  function cleanText(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function escapeHtml(value = "") {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function slugify(value) {
    return cleanText(value)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  function formatTitle(value) {
    const source = cleanText(value);
    if (!source) {
      return "";
    }
    return source
      .split(" ")
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function deriveTitle(entry, src) {
    const titleCandidate = cleanText(entry.title);
    if (titleCandidate) {
      return titleCandidate;
    }

    const captionCandidate = cleanText(entry.caption);
    if (captionCandidate) {
      return captionCandidate;
    }

    const filename = cleanText(src).split("/").pop() || "gallery-item";
    const base = filename.replace(/\.[^/.]+$/, "").replace(/[_-]+/g, " ").replace(/\s+/g, " ");
    return formatTitle(base) || "Gallery item";
  }

  function detectMediaType(entry, src) {
    const type = cleanText(entry.type).toLowerCase();
    const normalizedSrc = cleanText(src).toLowerCase().split("?")[0];
    const isVideoByExt = /\.(mp4|webm|ogg|mov|m4v|avi)$/.test(normalizedSrc);
    const isImageByExt = /\.(png|jpe?g|gif|webp|bmp|svg|avif)$/.test(normalizedSrc);

    if (type === "video" && isImageByExt) {
      return "image";
    }
    if (type === "image" && isVideoByExt) {
      return "video";
    }
    if (type === "video" || type === "image") {
      return type;
    }
    return isVideoByExt ? "video" : "image";
  }

  function normalizeCategory(value) {
    const raw = cleanText(value);
    if (!raw) {
      return DEFAULT_CATEGORY;
    }

    const collapsed = raw.replace(/\s+/g, " ");
    return collapsed.charAt(0).toUpperCase() + collapsed.slice(1);
  }

  function normalizeLayout(value) {
    const layout = cleanText(value).toLowerCase();
    return ["square", "medium", "tall", "wide", "hero"].includes(layout) ? layout : "";
  }

  function normalizeGallery(items) {
    const normalized = [];
    const seen = new Set();

    items.forEach((entry, index) => {
      if (!entry || typeof entry !== "object") {
        return;
      }

      const src = cleanText(entry.src);
      if (!src) {
        return;
      }

      const title = deriveTitle(entry, src);
      const uniqueKey = src.toLowerCase();
      if (seen.has(uniqueKey)) {
        return;
      }
      seen.add(uniqueKey);

      const type = detectMediaType(entry, src);
      const alt = title;
      const caption = cleanText(entry.caption) || title;
      const category = normalizeCategory(entry.category);
      const layout = normalizeLayout(entry.layout);

      normalized.push({
        type,
        src,
        alt,
        title,
        caption,
        category,
        layout,
      });
    });

    return normalized;
  }

  function buildFilters(items) {
    const categorySet = new Set();
    items.forEach((item) => categorySet.add(item.category || DEFAULT_CATEGORY));

    const presentBaseCategories = BASE_CATEGORY_ORDER.filter((category) => categorySet.has(category));
    const extraCategories = Array.from(categorySet)
      .filter((category) => !BASE_CATEGORY_ORDER.includes(category))
      .sort((a, b) => a.localeCompare(b));
    const hasVideo = items.some((item) => item.type === "video");

    return [FILTER_ALL, ...presentBaseCategories, ...extraCategories, ...(hasVideo ? [FILTER_VIDEO] : [])];
  }

  function matchesFilter(item, filter) {
    if (filter === FILTER_ALL) {
      return true;
    }
    if (filter === FILTER_VIDEO) {
      return item.type === "video";
    }
    return item.category === filter;
  }

  function renderEmptyState(message) {
    if (!galleryContainer) {
      return;
    }
    galleryContainer.innerHTML = `<div class="empty-state" role="status">${escapeHtml(message)}</div>`;
    if (typeof window !== "undefined" && typeof window.refreshRevealAnimations === "function") {
      window.refreshRevealAnimations(galleryContainer);
    }
    if (typeof window !== "undefined" && typeof window.refreshScrollCue === "function") {
      window.refreshScrollCue();
    }
  }

  const normalizedGallery = normalizeGallery(gallery);

  if (!galleryContainer || !filtersContainer) {
    return;
  }

  if (!normalizedGallery.length) {
    filtersContainer.innerHTML = "";
    renderEmptyState("Gallery is being prepared.");
    return;
  }

  const filters = buildFilters(normalizedGallery);
  let activeFilter = FILTER_ALL;

  function renderFilterBar() {
    const filterButtons = filters
      .map((filter) => {
        const isActive = filter === activeFilter;
        const activeClass = isActive ? " is-active" : "";
        return `<button class="gallery-filter${activeClass}" type="button" data-filter="${escapeHtml(
          filter
        )}" aria-pressed="${isActive ? "true" : "false"}">${escapeHtml(filter)}</button>`;
      })
      .join("");

    filtersContainer.innerHTML = `<div class="gallery-filters__track" role="toolbar" aria-label="Filter gallery media">${filterButtons}</div>`;

    filtersContainer.querySelectorAll(".gallery-filter").forEach((button) => {
      button.addEventListener("click", () => {
        const nextFilter = cleanText(button.dataset.filter) || FILTER_ALL;
        if (nextFilter === activeFilter) {
          return;
        }
        activeFilter = nextFilter;
        renderFilterBar();
        renderGalleryItems();
      });
    });
  }

  function renderGalleryItems() {
    const filtered = normalizedGallery.filter((item) => matchesFilter(item, activeFilter));

    if (!filtered.length) {
      renderEmptyState(`No media found under "${activeFilter}" yet.`);
      return;
    }

    renderGallery(galleryContainer, filtered);
  }

  renderFilterBar();
  renderGalleryItems();
  } finally {
    document.documentElement.classList.remove("js-page-pending");
  }
})();
