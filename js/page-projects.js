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

  function toProjectId(item = {}) {
    const explicitId = String(item.id || "").trim();
    if (explicitId) {
      return explicitId;
    }
    return String(item.title || "project")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-");
  }

  function setupProjectsModal(projectItems = []) {
    const modal = document.getElementById("project-modal");
    const closeButton = document.getElementById("project-modal-close");
    const imageEl = document.getElementById("project-modal-image");
    const metaEl = document.getElementById("project-modal-meta");
    const titleEl = document.getElementById("project-modal-title");
    const descriptionEl = document.getElementById("project-modal-description");
    const tagsEl = document.getElementById("project-modal-tags");
    const linksEl = document.getElementById("project-modal-links");
    const grid = document.getElementById("projects-featured");

    if (!modal || !closeButton || !imageEl || !metaEl || !titleEl || !descriptionEl || !tagsEl || !linksEl || !grid) {
      return;
    }

    const projectById = new Map(projectItems.map((item) => [toProjectId(item), item]));
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
      const year = item.year ? String(item.year) : "Project";
      const category = String(item.category || "").trim();
      const meta = category ? `${year} / ${category}` : year;
      const image = item.primaryImage || "images/white_background.png";
      const description = item.description || item.summary || "Full project details coming soon.";
      const tags = Array.isArray(item.tags) ? item.tags : [];
      const links = Array.isArray(item.links) ? item.links : [];

      metaEl.textContent = meta;
      titleEl.textContent = item.title || "Project";
      imageEl.src = image;
      imageEl.alt = `${item.title || "Project"} preview`;
      descriptionEl.innerHTML = formatInlineRichText(description);
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

      const card = event.target.closest(".work-card--project[data-project-id]");
      if (!card) {
        return;
      }

      const id = card.dataset.projectId || "";
      openModal(projectById.get(id), card);
    });

    grid.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      const card = event.target.closest(".work-card--project[data-project-id]");
      if (!card) {
        return;
      }

      if (event.target.closest("a, button")) {
        return;
      }

      event.preventDefault();
      const id = card.dataset.projectId || "";
      openModal(projectById.get(id), card);
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
      ? await dataApi.load(["projects"])
      : window.SITE_DATA || {};
  const { renderProjects } = window.SiteRender;

  const projects = Array.isArray(SITE_DATA.projects) ? SITE_DATA.projects : [];
  renderProjects("projects-featured", projects, {
    compact: true,
    researchStyle: true,
    emptyMessage: "Projects will appear here shortly.",
  });
  setupProjectsModal(projects);
  } finally {
    document.documentElement.classList.remove("js-page-pending");
  }
})();
