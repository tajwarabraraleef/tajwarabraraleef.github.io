(function () {
  const DATA_FILES = Object.freeze({
    siteManifest: "data/site-manifest.json",
    profile: "data/profile.json",
    logos: "data/logos.json",
    professionalSummary: "data/professionalSummary.json",
    currentRoles: "data/currentRoles.json",
    experience: "data/experience.json",
    education: "data/education.json",
    socialLinks: "data/socialLinks.json",
    projects: "data/projects.json",
    research: "data/research.json",
    hobbies: "data/hobbies.json",
    gallery: "data/gallery.json",
  });

  const ARRAY_SECTIONS = new Set([
    "currentRoles",
    "experience",
    "education",
    "socialLinks",
    "projects",
    "research",
    "gallery",
  ]);

  const sectionCache = {};
  const inFlight = {};
  const initialData = window.SITE_DATA && typeof window.SITE_DATA === "object" ? window.SITE_DATA : {};

  Object.keys(initialData).forEach((section) => {
    sectionCache[section] = initialData[section];
  });

  function getDefaultValue(section) {
    return ARRAY_SECTIONS.has(section) ? [] : {};
  }

  function normalizeSections(sections) {
    if (Array.isArray(sections) && sections.length) {
      return sections.filter((section) => DATA_FILES[section]);
    }

    if (typeof sections === "string" && DATA_FILES[sections]) {
      return [sections];
    }

    return Object.keys(DATA_FILES);
  }

  async function fetchSection(section) {
    if (Object.prototype.hasOwnProperty.call(sectionCache, section)) {
      return sectionCache[section];
    }

    if (inFlight[section]) {
      return inFlight[section];
    }

    const path = DATA_FILES[section];
    inFlight[section] = fetch(path)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
      })
      .then((value) => {
        sectionCache[section] = value;
        return value;
      })
      .catch((error) => {
        console.error(`[SiteData] Failed to load ${section} from ${path}.`, error);
        const fallback = getDefaultValue(section);
        sectionCache[section] = fallback;
        return fallback;
      })
      .finally(() => {
        delete inFlight[section];
      });

    return inFlight[section];
  }

  async function load(sections) {
    const targetSections = normalizeSections(sections);
    await Promise.all(targetSections.map((section) => fetchSection(section)));

    const merged = {};
    Object.keys(DATA_FILES).forEach((section) => {
      merged[section] = Object.prototype.hasOwnProperty.call(sectionCache, section)
        ? sectionCache[section]
        : getDefaultValue(section);
    });

    window.SITE_DATA = merged;
    return merged;
  }

  function getLoaded() {
    return window.SITE_DATA && typeof window.SITE_DATA === "object" ? window.SITE_DATA : null;
  }

  window.SiteData = {
    files: DATA_FILES,
    load,
    loadAll: () => load(),
    getLoaded,
  };
})();
