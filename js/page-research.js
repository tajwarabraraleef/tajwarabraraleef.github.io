(async function () {
  try {
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

  function tagPill(tag) {
    return `<span class="tag-pill">${escapeHtml(tag)}</span>`;
  }

  function linkPill(link) {
    const label = escapeHtml(link.label || "Link");
    const url = escapeHtml(link.url || "#");
    const kind = escapeHtml(link.kind || "link");
    return `<a class="link-pill link-pill--${kind} external-link-button" href="${url}" target="_blank" rel="noopener noreferrer"><span>${label}</span><i class="fa-solid fa-arrow-up-right-from-square external-link-icon" aria-hidden="true"></i></a>`;
  }

  function toResearchId(item = {}) {
    const explicitId = String(item.id || "").trim();
    if (explicitId) {
      return explicitId;
    }
    return String(item.title || "research-work")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
  }

  function setupResearchModal(researchItems = []) {
    const modal = document.getElementById("research-modal");
    const closeButton = document.getElementById("research-modal-close");
    const imageEl = document.getElementById("research-modal-image");
    const metaEl = document.getElementById("research-modal-meta");
    const titleEl = document.getElementById("research-modal-title");
    const authorsEl = document.getElementById("research-modal-authors");
    const abstractEl = document.getElementById("research-modal-abstract");
    const tagsEl = document.getElementById("research-modal-tags");
    const linksEl = document.getElementById("research-modal-links");
    const grid = document.getElementById("research-featured");

    if (!modal || !closeButton || !imageEl || !metaEl || !titleEl || !authorsEl || !abstractEl || !tagsEl || !linksEl || !grid) {
      return;
    }

    const researchById = new Map(researchItems.map((item) => [toResearchId(item), item]));
    let previousActive = null;

    function closeModal() {
      modal.classList.remove("is-open");
      modal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (previousActive && typeof previousActive.focus === "function") {
        previousActive.focus();
      }
    }

    function openModal(item, trigger) {
      if (!item) {
        return;
      }

      previousActive = trigger || document.activeElement;
      const year = item.year ? String(item.year) : "Research";
      const venue = item.venue || "Publication";
      const image = item.primaryImage || "images/white_background.png";
      const abstract = item.abstract || item.description || item.summary || "Full abstract coming soon.";
      const authors = Array.isArray(item.authors)
        ? item.authors.map((name) => String(name || "").trim()).filter(Boolean).join(", ")
        : String(item.authors || "").trim();
      const tags = Array.isArray(item.tags) ? item.tags : [];
      const links = Array.isArray(item.links) ? item.links : [];

      metaEl.textContent = `${year} / ${venue}`;
      titleEl.textContent = item.title || "Research Work";
      imageEl.src = image;
      imageEl.alt = `${item.title || "Research work"} figure`;
      authorsEl.textContent = authors;
      authorsEl.hidden = !authors;
      abstractEl.innerHTML = formatInlineRichText(abstract);
      tagsEl.innerHTML = tags.map(tagPill).join("");
      linksEl.innerHTML = links.length ? links.map(linkPill).join("") : '<span class="tag-pill">No external links</span>';

      modal.classList.add("is-open");
      modal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      closeButton.focus();
    }

    grid.addEventListener("click", (event) => {
      if (event.target.closest("a, button")) {
        return;
      }

      const card = event.target.closest(".work-card--research[data-research-id]");
      if (!card) {
        return;
      }

      const id = card.dataset.researchId || "";
      openModal(researchById.get(id), card);
    });

    grid.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      const card = event.target.closest(".work-card--research[data-research-id]");
      if (!card) {
        return;
      }

      if (event.target.closest("a, button")) {
        return;
      }

      event.preventDefault();
      const id = card.dataset.researchId || "";
      openModal(researchById.get(id), card);
    });

    closeButton.addEventListener("click", closeModal);
    modal.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!modal.classList.contains("is-open")) {
        return;
      }
      if (event.key === "Escape") {
        closeModal();
      }
    });
  }

  const dataApi = window.SiteData;
  const SITE_DATA =
    dataApi && typeof dataApi.load === "function"
      ? await dataApi.load(["research"])
      : window.SITE_DATA || {};
  const { renderResearch } = window.SiteRender;

  const research = Array.isArray(SITE_DATA.research) ? SITE_DATA.research : [];
  renderResearch("research-featured", research, {
    compact: true,
    emptyMessage: "Research entries will appear here shortly.",
  });
  setupResearchModal(research);
  } finally {
    document.documentElement.classList.remove("js-page-pending");
  }
})();
