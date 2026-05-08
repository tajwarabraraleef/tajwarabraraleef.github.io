(async function () {
  try {
  const dataApi = window.SiteData;
  const SITE_DATA =
    dataApi && typeof dataApi.load === "function"
      ? await dataApi.load(["education"])
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

  function safeUrl(value = "") {
    const candidate = String(value || "").trim();
    if (!candidate) {
      return "";
    }
    try {
      const parsed = new URL(candidate);
      const protocol = String(parsed.protocol || "").toLowerCase();
      return protocol === "http:" || protocol === "https:" ? parsed.href : "";
    } catch (_) {
      return "";
    }
  }

  function renderThesis(item = {}) {
    const thesisText = String(item.thesis || "").trim();
    const thesisUrl = safeUrl(item.thesisUrl || item.thesisLink || "");
    const thesisLabel = String(item.thesisLabel || "Full Thesis").trim() || "Full Thesis";

    if (!thesisText) {
      return '<span class="education-detail-placeholder">Not specified</span>';
    }

    const linkHtml = thesisUrl
      ? ` <a class="education-thesis-link" href="${escapeHtml(thesisUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(thesisLabel)}</a>`
      : "";

    return `${formatInlineRichText(thesisText)}${linkHtml}`;
  }

  function toYear(value, fallback) {
    if (!value || value === "Present") {
      return fallback;
    }
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : fallback;
  }

  function renderChipRow(items = [], fallbackText = "Not specified") {
    if (!Array.isArray(items) || !items.length) {
      return `<span class="education-detail-placeholder">${formatInlineRichText(fallbackText)}</span>`;
    }

    return items
      .map((item) => `<span class="tag-pill">${formatInlineRichText(item)}</span>`)
      .join("");
  }

  function renderListRow(items = [], fallbackText = "Not specified") {
    if (!Array.isArray(items) || !items.length) {
      return `<p class="education-detail-placeholder">${formatInlineRichText(fallbackText)}</p>`;
    }

    return `<ul class="education-detail-list">
      ${items.map((item) => `<li>${formatInlineRichText(item)}</li>`).join("")}
    </ul>`;
  }

  function renderTimeline() {
    const container = document.getElementById("education-timeline");
    if (!container) {
      return;
    }

    const entries = Array.isArray(SITE_DATA.education) ? [...SITE_DATA.education] : [];
    if (!entries.length) {
      container.innerHTML = '<div class="empty-state">Education timeline is being prepared.</div>';
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
        const bulletItems = Array.isArray(item.bullets) ? item.bullets : [];
        const bullets = bulletItems
          .map((line) => `<li>${formatInlineRichText(line)}</li>`)
          .join("");
        const highlightsBlock = `<section class="education-description-section">
          <p class="education-section-title">Description</p>
          ${bullets ? `<ul class="timeline-highlights education-description-list">${bullets}</ul>` : '<p class="education-detail-placeholder">Not specified</p>'}
        </section>`;
        const logo = escapeHtml(item.logo || "images/white_background.png");
        const grade = String(item.grade || "").trim();
        const supervisor = String(item.supervisor || "").trim();
        const topics = Array.isArray(item.topics) ? item.topics : [];
        const scholarships = Array.isArray(item.scholarships) ? item.scholarships : [];
        const scholarshipBlock = `<section class="education-scholarships-section">
          <p class="education-section-title">Scholarships</p>
          <div class="education-detail-list-wrap">${renderListRow(scholarships)}</div>
        </section>`;

        return `<article class="timeline-item" data-reveal>
          <div class="timeline-marker" aria-hidden="true"></div>
          <div class="timeline-body">
            <span class="timeline-entry-logo timeline-entry-logo--academic" aria-hidden="true">
              <img src="${logo}" alt="" loading="lazy" data-fallback="images/white_background.png">
            </span>
            <p class="timeline-meta">${escapeHtml(item.start || "")} - ${escapeHtml(item.end || "")} / ${escapeHtml(item.location || "")}</p>
            <h3>${escapeHtml(item.degree || "")}</h3>
            <p class="timeline-org">${escapeHtml(item.institution || "")}</p>
            <div class="education-detail-block">
              <p class="education-detail-row">
                <span class="education-detail-label">Thesis</span>
                <span class="education-detail-value">${renderThesis(item)}</span>
              </p>
              <p class="education-detail-row">
                <span class="education-detail-label">Supervisor</span>
                <span class="education-detail-value">${formatInlineRichText(supervisor || "Not specified")}</span>
              </p>
              <p class="education-detail-row education-detail-row--grade">
                <span class="education-detail-label">Grade</span>
                <span class="education-detail-value education-detail-value--grade">${formatInlineRichText(grade || "Not specified")}</span>
              </p>
            </div>
            ${scholarshipBlock}
            ${highlightsBlock}
            <hr class="education-topics-divider" aria-hidden="true">
            <div class="education-detail-row education-detail-row--chips">
              <span class="education-detail-label">Topics</span>
              <div class="tag-row education-detail-chips">${renderChipRow(topics)}</div>
            </div>
          </div>
        </article>`;
      })
      .join("");
  }

  renderTimeline();

  if (typeof window.refreshRevealAnimations === "function") {
    window.refreshRevealAnimations(document.getElementById("education-timeline"));
  }
  if (typeof window.refreshImageFallbacks === "function") {
    window.refreshImageFallbacks(document.getElementById("education-timeline"));
  }
  } finally {
    document.documentElement.classList.remove("js-page-pending");
  }
})();
