# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Custom Omeka S theme ("Patriots' Path") for the Arlington Historical Society oral history archive. The theme presents 80+ recorded interviews with Arlington, MA residents. Design prototype is in `prototype/` (React/HTML reference, not production code).

## Development Environment

```bash
docker compose up -d        # starts nginx (8080) + omeka-s (PHP-FPM) + mariadb
python3 seed.py             # populates sample data (reads API keys from .env)
```

- **Site URL:** http://localhost:8080/s/ahs-oral-history
- **Admin:** http://localhost:8080/admin
- Theme is bind-mounted (`./theme:/var/www/html/themes/ahs`) — edits are live on refresh, no restart needed.
- `APPLICATION_ENV=development` is set in nginx fastcgi_params for full error output.
- Modules live in a Docker volume (not the repo). After `docker compose down -v`, modules must be re-installed from zip files.

## Architecture

This is an **Omeka S theme** — not a standalone app. Omeka S uses the Laminas MVC framework with `.phtml` templates (PHP + HTML). There is no build step, no bundler, no Node.js dependency.

### Template override system

Omeka S checks `themes/ahs/view/` first, then falls back to `application/view/`. To override a core template, mirror its path:
- Core: `application/view/omeka/site/item/show.phtml`
- Theme: `theme/view/omeka/site/item/show.phtml`

### Key templates and their roles

- `view/layout/layout.phtml` — master layout wrapping all pages (pre-header, header nav, footer)
- `view/omeka/site/page/show.phtml` — renders site pages; detects homepage via `$site->homepage()` to show custom home layout vs standard editorial layout
- `view/omeka/site/item/show.phtml` — single interview page (breadcrumb, hero, media, citation generator sidebar)
- `view/omeka/site/item/browse.phtml` — browse interviews with result rows and metadata
- `view/omeka/site/item-set/browse.phtml` — collections grid with `accentSoft` cards
- `view/omeka/site/index/index.phtml` — fallback homepage when no site pages exist
- `view/common/theme-config.phtml` — required partial (can be empty, but must exist)

### Homepage routing

Omeka S serves the homepage as a **site page** via `page/show.phtml`, not `index/index.phtml`. The template checks `$site->homepage()` to decide whether to render the custom home layout (hero + recent items + collections grid) or a standard editorial page. `index/index.phtml` is only used when no pages are configured at all.

### CSS

Single stylesheet at `theme/asset/css/style.css` with CSS custom properties for all design tokens. No preprocessor. The design system uses three font families loaded from Google Fonts: Bitter (display), Inter (body), JetBrains Mono (kickers/meta).

### JavaScript

`theme/asset/js/transcript-player.js` handles the citation generator (working) and will handle transcript sync (stub). It reads item metadata from a `data-citation` JSON attribute on the `#citation-generator` element.

## Omeka S Conventions & Gotchas

- **No `truncate` view helper** — use `mb_substr()` directly.
- **`$site->homepage()` can return null** — always null-check before calling `->slug()`.
- **`$this->pageTitle()` renders a visible `<h2>`** — use `$this->headTitle()` if you only want the HTML `<title>` tag.
- **Navigation renders as `<ul class="navigation">`** — not a custom ID. Style with `#top-nav ul.navigation`.
- **Item sets must be assigned to a site** to appear in `site_id` queries — this is an admin step, not automatic.
- **Dublin Core properties** are referenced by term (e.g., `dcterms:title`, `dcterms:subject`). Use `$item->value('dcterms:subject', ['all' => true])` for repeatable values.
- **Media uploads via API** require multipart form data with `file_index: 0` in the JSON payload.
- **Contrast rule:** text on `--paper-alt` (navy #0E1B2C) must use `--paper-alt-ink` (parchment), `--paper-alt-ink-soft`, or `--paper-alt-brand` — never `--ink` or `--brand` (navy/crimson on navy is invisible).

## Installed Modules

FacetedBrowse, OhmsEmbed, AdvancedSearch, BulkImport, BulkExport, BulkEdit, EasyAdmin, ActivityLog, ApiInfo, BotChallenge, Coins. Activate in Admin > Modules.

## Sample Data

`seed.py` creates 6 item sets and 8 interview items with Dublin Core metadata. It reads `OMEKA_KEY_IDENTITY` and `OMEKA_KEY_CREDENTIAL` from `.env`. Site ID is 1, slug is `ahs-oral-history`. McGrath item (ID 14) has a dummy audio file and transcript for testing.
