# Data Folder Guide

This folder is the source of truth for all site content.

## Editing Existing Content

- Open the relevant JSON file.
- Edit values or add/remove items in arrays.
- Save and refresh the page.

## Common Files

- `projects.json`: Add project entries. Set `"featured": true` to show on home/projects featured sections.
- `research.json`: Add publication entries. Set `"featured": true` to prioritize it in featured areas.
- `experience.json`: Add timeline roles.
- `currentRoles.json`: Add active role cards.
- `hobbies.json`: Add personal snapshot cards.
- `gallery.json`: Add manual gallery media items.

## Notes

- Keep valid JSON syntax (double quotes, no trailing comments).
- Reuse the same field names used by existing entries to avoid rendering issues.
