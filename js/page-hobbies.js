(async function () {
  try {
  const dataApi = window.SiteData;
  const SITE_DATA =
    dataApi && typeof dataApi.load === "function"
      ? await dataApi.load(["hobbies"])
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

  const hobbies = SITE_DATA.hobbies || {};
  const sections = Array.isArray(hobbies.sections) ? hobbies.sections : [];
  const intro = document.getElementById("hobbies-intro");
  if (intro) {
    intro.innerHTML = formatInlineRichText(hobbies.headline || "");
  }

  const container = document.getElementById("hobbies-sections");
  if (!container) {
    return;
  }

  container.innerHTML = sections
    .map(
      (item) => {
        const actions = Array.isArray(item.actions) ? item.actions : [];
        return `<article class="snapshot-card" data-reveal>
        <h3>${escapeHtml(item.title || "")}</h3>
        <p>${formatInlineRichText(item.description || "")}</p>
        <div class="link-row">${actions
          .map(
            (action) =>
              `<a class="link-pill external-link-button" href="${escapeHtml(action.url || "#")}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(action.label || "Link")}</span><i class="fa-solid fa-arrow-up-right-from-square external-link-icon" aria-hidden="true"></i></a>`
          )
          .join("")}</div>
      </article>`;
      }
    )
    .join("");

  if (typeof window.refreshRevealAnimations === "function") {
    window.refreshRevealAnimations(container);
  }
  } finally {
    document.documentElement.classList.remove("js-page-pending");
  }
})();
