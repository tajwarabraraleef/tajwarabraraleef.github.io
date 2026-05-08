document.documentElement.classList.add("js-enabled");

function setupMobileNav() {
  const button = document.getElementById("nav-toggle");
  const nav = document.getElementById("site-nav");

  if (!button || !nav) {
    return;
  }

  button.addEventListener("click", () => {
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    nav.dataset.open = expanded ? "false" : "true";
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      button.setAttribute("aria-expanded", "false");
      nav.dataset.open = "false";
    });
  });
}

function highlightCurrentPage() {
  const page = document.body.dataset.page || "home";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
}

function refreshRevealAnimations(root = document) {
  const scope = root && root.querySelectorAll ? root : document;
  const targets = scope.querySelectorAll("[data-reveal]:not([data-reveal-bound])");
  if (!targets.length) {
    return;
  }

  targets.forEach((item) => {
    item.setAttribute("data-reveal-bound", "true");
    item.classList.add("is-visible");
  });
}

function setupImageFallbacks(root = document) {
  const scope = root && root.querySelectorAll ? root : document;
  scope.querySelectorAll("img[data-fallback]:not([data-fallback-bound])").forEach((img) => {
    img.setAttribute("data-fallback-bound", "true");
    img.addEventListener("error", () => {
      const fallback = img.dataset.fallback;
      if (fallback && img.src !== fallback) {
        img.src = fallback;
      }
    });
  });
}

let lightboxRefs = null;
let lightboxItems = [];
let currentLightboxIndex = -1;
let lastLightboxTrigger = null;

function rebuildLightboxItems() {
  lightboxItems = Array.from(document.querySelectorAll(".gallery-trigger"));
  if (currentLightboxIndex >= lightboxItems.length) {
    currentLightboxIndex = lightboxItems.length - 1;
  }
}

function openLightboxAt(index) {
  if (!lightboxRefs) {
    return;
  }

  if (!lightboxItems.length) {
    rebuildLightboxItems();
  }

  if (!lightboxItems.length) {
    return;
  }

  const safeIndex = ((index % lightboxItems.length) + lightboxItems.length) % lightboxItems.length;
  const button = lightboxItems[safeIndex];
  if (!button) {
    return;
  }

  const mediaType = button.dataset.mediaType === "video" ? "video" : "image";
  const source = button.dataset.src || button.dataset.full || "";
  const alt = button.dataset.alt || button.dataset.title || "Gallery media";
  const title = (button.dataset.title || button.dataset.alt || "Gallery media").trim();
  const caption = (button.dataset.caption || button.dataset.alt || "").trim();
  if (!source) {
    return;
  }

  currentLightboxIndex = safeIndex;
  lastLightboxTrigger = button;

  if (lightboxRefs.video) {
    lightboxRefs.video.pause();
    lightboxRefs.video.controls = false;
    lightboxRefs.video.removeAttribute("src");
    lightboxRefs.video.hidden = true;
  }

  if (mediaType === "video" && lightboxRefs.video) {
    lightboxRefs.image.hidden = true;
    lightboxRefs.image.src = "";
    lightboxRefs.image.alt = "";
    lightboxRefs.video.hidden = false;
    lightboxRefs.video.controls = true;
    lightboxRefs.video.src = source;
    lightboxRefs.video.setAttribute("aria-label", alt || "Gallery video");
  } else {
    lightboxRefs.image.hidden = false;
    lightboxRefs.image.src = source;
    lightboxRefs.image.alt = alt || "Gallery image";
    if (lightboxRefs.video) {
      lightboxRefs.video.hidden = true;
      lightboxRefs.video.removeAttribute("aria-label");
    }
  }

  if (lightboxRefs.caption) {
    lightboxRefs.caption.textContent = "";
    const titleEl = document.createElement("strong");
    titleEl.textContent = title;
    lightboxRefs.caption.appendChild(titleEl);

    if (caption && caption !== title) {
      lightboxRefs.caption.append(`: ${caption}`);
    }

    lightboxRefs.caption.hidden = !title;
  }

  const showNav = lightboxItems.length > 1;
  if (lightboxRefs.prevButton) {
    lightboxRefs.prevButton.hidden = !showNav;
  }
  if (lightboxRefs.nextButton) {
    lightboxRefs.nextButton.hidden = !showNav;
  }

  lightboxRefs.modal.classList.add("is-open");
  lightboxRefs.modal.setAttribute("aria-hidden", "false");
  lightboxRefs.closeButton?.focus();
}

function closeLightbox() {
  if (!lightboxRefs) {
    return;
  }

  const hadOpenModal = lightboxRefs.modal.classList.contains("is-open");
  lightboxRefs.modal.classList.remove("is-open");
  lightboxRefs.modal.setAttribute("aria-hidden", "true");
  lightboxRefs.image.src = "";
  lightboxRefs.image.alt = "";
  lightboxRefs.image.hidden = false;
  if (lightboxRefs.video) {
    lightboxRefs.video.pause();
    lightboxRefs.video.controls = false;
    lightboxRefs.video.removeAttribute("src");
    lightboxRefs.video.removeAttribute("aria-label");
    lightboxRefs.video.hidden = true;
    lightboxRefs.video.load();
  }
  if (lightboxRefs.caption) {
    lightboxRefs.caption.textContent = "";
    lightboxRefs.caption.hidden = true;
  }
  if (hadOpenModal && lastLightboxTrigger && typeof lastLightboxTrigger.focus === "function") {
    lastLightboxTrigger.focus();
  }
}

function showPreviousLightboxImage() {
  if (!lightboxItems.length) {
    return;
  }
  openLightboxAt(currentLightboxIndex - 1);
}

function showNextLightboxImage() {
  if (!lightboxItems.length) {
    return;
  }
  openLightboxAt(currentLightboxIndex + 1);
}

function bindLightboxTriggers(root = document) {
  if (!lightboxRefs) {
    return;
  }

  rebuildLightboxItems();

  const scope = root && root.querySelectorAll ? root : document;
  scope.querySelectorAll(".gallery-trigger:not([data-lightbox-bound])").forEach((button) => {
    button.setAttribute("data-lightbox-bound", "true");
    button.addEventListener("click", () => {
      let index = lightboxItems.indexOf(button);
      if (index < 0) {
        rebuildLightboxItems();
        index = lightboxItems.indexOf(button);
      }
      if (index < 0) {
        return;
      }
      openLightboxAt(index);
    });
  });
}

function setupLightbox() {
  const modal = document.getElementById("lightbox");
  if (!modal) {
    return;
  }

  if (lightboxRefs) {
    bindLightboxTriggers();
    return;
  }

  const image = modal.querySelector("img");
  const video = modal.querySelector("video");
  const caption = modal.querySelector(".lightbox-caption");
  const closeButton = modal.querySelector(".lightbox-close");
  const prevButton = modal.querySelector(".lightbox-nav--prev");
  const nextButton = modal.querySelector(".lightbox-nav--next");

  lightboxRefs = { modal, image, video, caption, closeButton, prevButton, nextButton };
  bindLightboxTriggers();

  closeButton?.addEventListener("click", closeLightbox);
  prevButton?.addEventListener("click", showPreviousLightboxImage);
  nextButton?.addEventListener("click", showNextLightboxImage);

  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (!modal.classList.contains("is-open")) {
      return;
    }
    if (event.key === "Escape") {
      closeLightbox();
      return;
    }
    if (event.key === "ArrowLeft") {
      showPreviousLightboxImage();
      return;
    }
    if (event.key === "ArrowRight") {
      showNextLightboxImage();
    }
  });
}

function setFooterYear() {
  const yearTarget = document.getElementById("copyright-year");
  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }

  const footerNoteTarget = document.getElementById("footer-note");
  if (!footerNoteTarget) {
    return;
  }

  const config = window.SITE_CONFIG && typeof window.SITE_CONFIG === "object" ? window.SITE_CONFIG : null;
  if (config && typeof config.footerNote === "string" && config.footerNote.trim()) {
    footerNoteTarget.textContent = config.footerNote;
  }
}

let scrollCueElement = null;
let scrollCueBound = false;

function updateScrollCueVisibility() {
  if (!scrollCueElement) {
    return;
  }

  const scrollable = document.documentElement.scrollHeight - window.innerHeight > 140;
  const nearBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 120;
  scrollCueElement.hidden = !scrollable || nearBottom;
}

function setupScrollCue() {
  if (!scrollCueElement) {
    const cue = document.createElement("button");
    cue.type = "button";
    cue.id = "scroll-cue";
    cue.className = "scroll-cue";
    cue.setAttribute("aria-label", "Scroll down for more content");
    cue.innerHTML = '<span>Scroll for more</span><i class="fa-solid fa-angles-down" aria-hidden="true"></i>';
    cue.addEventListener("click", () => {
      window.scrollBy({ top: Math.max(280, Math.floor(window.innerHeight * 0.65)), behavior: "smooth" });
    });
    document.body.appendChild(cue);
    scrollCueElement = cue;
  }

  if (!scrollCueBound) {
    window.addEventListener("scroll", updateScrollCueVisibility, { passive: true });
    window.addEventListener("resize", updateScrollCueVisibility);
    scrollCueBound = true;
  }

  updateScrollCueVisibility();
}

function bootstrapSite() {
  setupMobileNav();
  highlightCurrentPage();
  setupImageFallbacks();
  setupLightbox();
  refreshRevealAnimations();
  setFooterYear();
  setupScrollCue();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", bootstrapSite);
} else {
  bootstrapSite();
}

window.refreshRevealAnimations = refreshRevealAnimations;
window.refreshImageFallbacks = setupImageFallbacks;
window.refreshLightboxTriggers = bindLightboxTriggers;
window.refreshScrollCue = updateScrollCueVisibility;
