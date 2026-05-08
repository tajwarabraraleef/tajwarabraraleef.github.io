# tajwarabraraleef.github.io

Personal portfolio site hosted on GitHub Pages.

## Local Development

Run:

```bash
npx live-server --port=5500 --open=index.html --watch="*.html,css/*.css,js/*.js,data/*.json"
```

## Project Structure

- `index.html` + `*.html`: Static pages
- `css/style.css`: Main styles
- `js/site-*.js`: Shared site runtime and data loading
- `js/page-*.js`: Page-specific rendering
- `data/*.json`: Content source of truth
- `images/`: Local media assets

## Content Management

All main content is stored in modular JSON files under `data/`.

- `data/profile.json`: Home hero profile and CTA
- `data/socialLinks.json`: Social icons and links
- `data/professionalSummary.json`: Headline, summary, and metrics
- `data/currentRoles.json`: Current role cards
- `data/experience.json`: Full timeline entries
- `data/education.json`: Education entries
- `data/projects.json`: Projects page and featured project content
- `data/research.json`: Research page and featured research content
- `data/hobbies.json`: Personal snapshot content
- `data/gallery.json`: Gallery media items
- `data/site-manifest.json`: Site-level configuration text

`js/site-data.js` fetches these files and exposes content through `window.SiteData.load(...)` and `window.SITE_DATA`.

## Deploy Checklist (GitHub Pages)

1. Confirm all required files are tracked: `*.html`, `css/style.css`, `js/site-*.js`, `js/page-*.js`, `data/*.json`, and referenced `images/*`.
2. Keep local-only files untracked via `.gitignore` (for example: `.vscode/`, `tmp/`, local vendor folders not used by runtime).
3. Update `sitemap.xml` when adding/removing pages.
4. Commit and push to the Pages branch.
