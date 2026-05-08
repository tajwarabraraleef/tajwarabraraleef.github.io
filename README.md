# tajwarabraraleef.github.io

Source code for the website.

## Content Management

All site content now lives in modular JSON files under `data/`.

- `data/profile.json`: Home hero profile and CTA
- `data/socialLinks.json`: Social icons and links
- `data/professionalSummary.json`: Headline, blurb, and metrics
- `data/currentRoles.json`: Current leadership role cards
- `data/experience.json`: Full timeline entries
- `data/education.json`: Education section
- `data/projects.json`: Projects page + home featured projects
- `data/research.json`: Research page + home featured research
- `data/hobbies.json`: Hobbies and personal snapshot cards
- `data/gallery.json`: Manual gallery items

`js/site-data.js` is now a loader. It fetches JSON sections and exposes them through `window.SiteData.load(...)` and `window.SITE_DATA`.

## Adding New Content

1. Update the relevant JSON file in `data/`.
2. Keep field names consistent with existing entries.
3. Reload the page; no code changes are needed for standard content updates.

## If You Add a Brand-New Section

1. Create a new JSON file in `data/`.
2. Add it to `DATA_FILES` inside `js/site-data.js`.
3. Load it in the page script via `window.SiteData.load([\"yourSection\"])`.


To Run live server: npx live-server --port=5500 --open=index.html --watch="*.html,css/*.css,js/*.js,data/*.json"
