# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Custom Omeka S theme ("Patriots' Path") for the Arlington Historical Society oral history archive. The theme presents 80+ recorded interviews with Arlington, VA residents. Design prototype is in `prototype/` (React/HTML reference, not production code).

## Development Environment

```bash
docker compose up -d        # starts nginx (8080) + omeka-s (PHP-FPM) + mariadb
python3 seed.py             # populates sample data (reads API keys from .env)
```

- **Site URL:** http://localhost:8080/s/arlington-voices
- **Admin:** http://localhost:8080/admin
- Theme is bind-mounted (`./theme:/var/www/html/themes/ahs`) — edits are live on refresh, no restart needed.
- `APPLICATION_ENV=development` is set in nginx fastcgi_params for full error output.
- Modules live in `plugins/` as zip files and are auto-installed on container startup. After `docker compose down -v`, modules are re-installed automatically on next `up`.

## Architecture

This is an **Omeka S theme** — not a standalone app. Omeka S uses the Laminas MVC framework with `.phtml` templates (PHP + HTML). There is no build step, no bundler, no Node.js dependency.

### Template override system

Omeka S checks `themes/ahs/view/` first, then falls back to `application/view/`. To override a core template, mirror its path:
- Core: `application/view/omeka/site/item/show.phtml`
- Theme: `theme/view/omeka/site/item/show.phtml`

### Key templates and their roles

- `view/layout/layout.phtml` — master layout wrapping all pages (pre-header, header nav, footer)
- `view/omeka/site/page/show.phtml` — renders site pages; detects homepage via `$site->homepage()` to show custom home layout vs standard editorial layout
- `view/omeka/site/item/show.phtml` — single interview page (breadcrumb, hero, transcript + audio left, metadata/citation sidebar right)
- `view/omeka/site/item/browse.phtml` — browse interviews with result rows and metadata
- `view/faceted-browse/site/page/page.phtml` — theme override for FacetedBrowse module
- `view/omeka/site/item-set/browse.phtml` — collections grid with `accentSoft` cards
- `view/omeka/site/index/index.phtml` — fallback homepage when no site pages exist
- `view/common/theme-config.phtml` — required partial (can be empty, but must exist)

### Homepage routing

Omeka S serves the homepage as a **site page** via `page/show.phtml`, not `index/index.phtml`. The template checks `$site->homepage()` to decide whether to render the custom home layout (hero + recent items + collections grid) or a standard editorial page. `index/index.phtml` is only used when no pages are configured at all.

### CSS

Single stylesheet at `theme/asset/css/style.css` with CSS custom properties for all design tokens. No preprocessor. The design system uses three font families loaded from Google Fonts: Bitter (display), Inter (body), JetBrains Mono (kickers/meta).

### JavaScript

`theme/asset/js/transcript-player.js` handles the citation generator and transcript sync. It parses `[HH:MM:SS]` timestamps in transcript text into clickable links that seek the audio/video player, and highlights the active timestamp during playback. Citation metadata is read from a `data-citation` JSON attribute on the `#citation-generator` element.

## Omeka S Conventions & Gotchas

- **No `truncate` view helper** — use `mb_substr()` directly.
- **`$site->homepage()` can return null** — always null-check before calling `->slug()`.
- **`$this->pageTitle()` renders a visible `<h2>`** — use `$this->headTitle()` if you only want the HTML `<title>` tag.
- **Navigation renders as `<ul class="navigation">`** — not a custom ID. Style with `#top-nav ul.navigation`.
- **Item sets must be assigned to a site** to appear in `site_id` queries — this is an admin step, not automatic.
- **Dublin Core properties** are referenced by term (e.g., `dcterms:title`, `dcterms:subject`). Use `$item->value('dcterms:subject', ['all' => true])` for repeatable values.
- **`$item->thumbnail()` only returns manually-set thumbnails** — use `$item->primaryMedia()->hasThumbnails()` to check for auto-generated thumbnails from uploaded media.
- **Media uploads via API** require multipart form data with `file_index: 0` in the JSON payload.
- **m4a audio files** are detected as `video/mp4` by Omeka — the JS transcript sync checks for both `audio` and `video` elements.
- **Contrast rule:** text on `--paper-alt` (navy #0E1B2C) must use `--paper-alt-ink` (white), `--paper-alt-ink-soft` (cool grey), or `--paper-alt-brand` (light sage) — never `--ink` or `--brand` (dark on dark is invisible).

## Installed Modules

Module zip files live in `plugins/` and are auto-installed on container startup via `docker/omeka-s/install-modules.sh`. Current modules: FacetedBrowse, AdvancedSearch, ActivityLog, GoogleAnalytics, Statistics, UniversalViewer. Activate in Admin > Modules after first install.

## Custom Vocabulary: Oral History

The file `vocabularies/oral-history.ttl` defines the `oralhistory` vocabulary with properties for transcript handling. To install (one-time, via admin):

1. Go to Admin > Vocabularies > Import new vocabulary
2. **Label:** Oral History
3. **Namespace URI:** `http://rrchnm.org/vocab/oral-history#`
4. **Namespace prefix:** `oralhistory`
5. **Vocabulary file:** upload `vocabularies/oral-history.ttl`

Properties defined:
- `oralhistory:transcript` — full interview transcript text, may include `[HH:MM:SS]` timestamps for audio sync
- `oralhistory:transcriptStatus` — draft / reviewed / final
- `oralhistory:transcriber` — person or service that produced the transcript
- `oralhistory:interviewLocation` — where the interview was conducted
- `oralhistory:seriesTitle` — oral history series or project name

After import, add these properties to the "Oral History Interview" resource template as needed.

## Sample Data

`seed.py` creates a resource template ("Oral History Interview"), 6 item sets, and 8 interview items with Dublin Core metadata and picsum placeholder thumbnails. It reads `OMEKA_KEY_IDENTITY` and `OMEKA_KEY_CREDENTIAL` from `.env`. Use `--template-only` to create just the resource template without sample data.

- **Site slug:** `arlington-voices`
- **Full seed:** `python3 seed.py`
- **Template only:** `python3 seed.py --template-only`
