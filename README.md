# Arlington Historical Society — Oral History Project (Omeka S Theme)

## Overview

A custom theme for the **Arlington Historical Society's** oral history archive, hosted on **Omeka S**. The site presents 80+ recorded interviews with Arlington, MA residents — searchable, browseable, and grouped into thematic item sets and curated exhibits. The signature feature is a **synced transcript** on each interview page: clicking any paragraph jumps the audio to that moment.

The locked design direction is **"Patriots' Path"** — a modern civic-editorial aesthetic with navy/crimson/parchment palette, slab-serif headlines (Bitter), and Inter for body. It nods to Patriots' Day and town history without being kitsch.

## About the Design Files

The files in `prototype/` are **design references created in HTML/React** — a working clickable prototype showing the intended look, layout, copy tone, and interactions. They are **not production code to copy directly**.

The task is to **recreate this design as an Omeka S theme** (`.phtml` templates + CSS), using Omeka S's standard theme conventions and template hierarchy. The prototype demonstrates *what to build*; Omeka's own theming system dictates *how to build it*.

## Fidelity

**High-fidelity (hifi).** Final colors, typography, spacing, and interaction patterns are locked. Recreate using exact tokens listed below. Real photography and audio will be supplied separately by AHS — placeholders in the prototype should be replaced with `<img>` tags pointing at Omeka's file derivatives (`fullsize`, `thumbnail`, `square_thumbnail`).

## Omeka S Theme Structure

The theme lives at `themes/ahs/` inside the Omeka S installation. Omeka S uses **Laminas `.phtml` templates** (PHP intermixed with HTML), not Twig.

```
themes/ahs/
├── config/
│   └── theme.ini                          # required — metadata + settings
├── asset/
│   ├── css/
│   │   └── style.css                      # main stylesheet
│   ├── js/
│   │   └── transcript-player.js           # synced transcript player
│   └── img/                               # theme images, logomark SVG
├── view/
│   ├── layout/
│   │   └── layout.phtml                   # master layout (header + footer chrome)
│   ├── common/
│   │   └── block-layout/                  # overrides for page block renderers
│   └── omeka/site/
│       ├── index/
│       │   └── index.phtml                # site homepage
│       ├── item/
│       │   ├── browse.phtml               # Browse Interviews
│       │   └── show.phtml                 # Single Interview (transcript player)
│       ├── item-set/
│       │   ├── browse.phtml               # Item Sets (collections) index
│       │   └── show.phtml                 # Single Item Set
│       ├── media/
│       │   └── show.phtml                 # Media page
│       └── page/
│           └── show.phtml                 # Simple pages (About, etc.)
└── theme.jpg                              # admin UI thumbnail
```

Templates override core defaults by mirroring the path from `application/view/`. Omeka S checks the theme directory first, then falls back to the application default. Reference themes: [default](https://github.com/omeka-s-themes/default), [foundation](https://github.com/omeka-s-themes/foundation).

## How the Design Maps to Omeka S Templates

| Prototype page | Omeka S template | Notes |
|---|---|---|
| Home | `view/omeka/site/index/index.phtml` | Featured item, recent items, item set grid |
| Browse Interviews | `view/omeka/site/item/browse.phtml` | Filterable list/grid of all items |
| Single Interview | `view/omeka/site/item/show.phtml` | The transcript-synced player |
| Item Sets index | `view/omeka/site/item-set/browse.phtml` | Grid of all item sets |
| Single Item Set | `view/omeka/site/item-set/show.phtml` | Item set metadata + items in it |
| Search | FacetedBrowse page (module) | Full-text + faceted; see modules section |
| Exhibits | Exhibit module pages | Curated multi-item pages |
| About | `view/omeka/site/page/show.phtml` | Via site page in admin |

The shared chrome (pre-header strip, header nav, footer) lives in `view/layout/layout.phtml`.

## Required Omeka S Modules

- **FacetedBrowse** — official faceted search/browse pages. Admins configure facets (value, item set, full-text, date range) per browse page. Theme can override module templates via the standard `view/` path. Pairs with **Numeric Data Types** for date range facets.
- **OhmsEmbed** — embeds OHMS XML-synced transcripts as media. Transcripts are created in the OHMS web app, exported as XML, and uploaded as media attachments. The module bundles a JS viewer for synced playback. Theme can override its rendering templates to match the design.
  - Alternative: **Transcript** module (Ivy Rose) — lighter, uses WebVTT subtitles instead of OHMS XML. Simpler but fewer features.
- **Exhibit Builder** (or equivalent Omeka S exhibit module) — for curated exhibit pages.
- **Numeric Data Types** — extends FacetedBrowse with date/numeric facet types.

Transcript text is stored in Omeka's built-in text fields on items, not as separate JSON files.

## Custom Resource Template: "Oral History Interview"

Define a resource template in Omeka S admin with these properties (mapped to Dublin Core or custom vocabulary):

| Property | Mapped to | Notes |
|---|---|---|
| Narrator name | `dcterms:title` | "Anthony Caruso" |
| Years | `dcterms:date` or custom | "b. 1936" or "1929–2020" |
| Date recorded | `dcterms:created` | "March 3, 2019" |
| Length | custom property | "2:11:04" |
| Neighborhood | custom property | "East Arlington" — used as a facet |
| Topics | `dcterms:subject` | Repeatable — "Mass Ave", "Italian-American", "Bakery" |
| Summary | `dcterms:description` | Shown on browse cards and at top of show page |
| Transcript | `dcterms:description` (alt) or custom | Full transcript text in Omeka text field |
| Audio file | Attached media | MP3, served via Omeka file derivatives |

## Pages — Detail

### 1. Home (`index/index.phtml`)

**Layout:** single column, max-width 1200px, full-bleed sections stacked vertically.

Sections in order:
1. **Hero** — full-width navy (`#0E1B2C`) background. Left: kicker ("AN ARLINGTON ORAL HISTORY PROJECT"), display headline ("The voices of a town, recorded"), body paragraph in parchment (`#F5E9D0`), two buttons (primary crimson + ghost). Right: large rotating photograph of Arlington. Rotates every ~6s with subtle crossfade.
2. **Featured interview** — light `paper` (`#FBFAF7`) background. Two-column: portrait/photo left (180px square), narrator name + item set kicker + pull quote in slab serif + summary + "Listen to the full interview" button on right.
3. **Recently added** — cream background, 4-column grid of cards. Each card: portrait thumb, item set kicker (uppercase mono), narrator name (slab), 1-line summary preview. Card click goes to interview page.
4. **Item set grid** — `paper` background, 3x2 grid of item set cards. Card background is `accentSoft` (`#EAF0F7` — pale blue), top-rule in crimson, mono meta line ("1900s–2020s · 22 interviews"), slab title, body blurb.

### 2. Browse Interviews (`item/browse.phtml`)

**Layout:** subpage hero (navy) with kicker + title + subtitle, then 240px filter sidebar + main results column.

**Filters in sidebar:**
- Item set (radio list)
- Decade (checkbox: 1900s, 1910s, ... 2020s — derived from date recorded)
- Topic (checkbox — derived from `dcterms:subject`, faceted)
- Neighborhood (checkbox — derived from neighborhood property)

**Main column:** sort dropdown ("Recently added / Narrator A–Z / Date recorded"), view toggle (list/grid), then results. Omeka handles pagination.

**Result row (list view):** portrait thumb (80px), narrator name + years, summary, mono meta strip (recorded date, length, item set, neighborhood), topic tags. Click row goes to interview page.

### 3. Single Interview (`item/show.phtml`) — THE HEART OF THE SITE

**Layout:**
- Breadcrumb strip on navy — "Home > Browse > Item Set name > Narrator name"
- Hero: portrait left (180x180), narrator name as H1 (slab, ~48px), item set kicker, mono meta strip (b. year, recorded date, length, neighborhood)
- Two columns below hero:
  - **Left (~720px):** Audio player (sticky), then transcript
  - **Right (~360px):** Sidebar — topics, related interviews, citation generator, download links

**Audio player (sticky to top of left column when scrolling transcript):**
- Navy background, parchment text
- Play/pause button, scrubber (filled in crimson), time display ("12:34 / 1:42:18"), playback speed selector (0.75/1/1.25/1.5x), download button

**Transcript:**
- Search box at top: "Search this transcript..." — filters segments to show only matches, highlights matched terms
- Each segment: speaker label (uppercase mono, dimmer), then paragraph text. Active segment has crimson left-rule (3px) and slightly darker background.
- Click any segment to jump audio to that time.
- Auto-scrolls active segment into view as audio plays.

Note: If using OhmsEmbed, the module provides its own player/transcript UI. The theme will need to override the module's templates to match this design, or build a custom rendering layer.

**Citation generator (sidebar):**
- Three tabs: Chicago, MLA, APA
- Generates citation from item metadata
- "Copy to clipboard" button

### 4. Single Item Set (`item-set/show.phtml`)

Subpage hero (navy) with item set title, year range, blurb. Below: optional curator note, then list of interviews in this item set (same row layout as Browse).

### 5. Item Sets Index (`item-set/browse.phtml`)

Subpage hero, then 2-column grid of item set cards. Cards use `accentSoft` background (`#EAF0F7`). Each card: top-rule in crimson, mono meta (years, count), slab title, body blurb.

### 6. Search (FacetedBrowse)

Configured via the FacetedBrowse module. Subpage hero contains the search input and a "Suggested searches" row of crimson links. Below: faceted results — left sidebar with filter facets, main column with result rows that include transcript snippets (matched terms highlighted in crimson). Theme overrides FacetedBrowse templates to match the design.

### 7. Exhibits

Subpage hero, then list of exhibits. Each exhibit row: 280x180 thumbnail (left), curator + year + count meta (mono), slab title, blurb, "View exhibit" ghost button.

### 8. About (site page)

Created as a site page in Omeka S admin. Editorial layout: wide content column (max ~720px), large slab headline, body in serif. Sections for: project mission, methodology, the team, how to contribute, rights & permissions, accessibility statement.

## Shared Chrome (`layout.phtml`)

### Pre-header strip
- Background: navy (`#0E1B2C`)
- Text: parchment (`#F5E9D0`) for primary, dimmer parchment (`#C9B98E`) for secondary
- Left: "An ongoing project of the **Arlington Historical Society**" (link)
- Right: "Visit AHS · Donate · Contribute a story"
- Mono font, 12px

### Header
- Navy background bar
- Left: logomark (star + lines SVG) + wordmark in parchment ("Arlington Historical Society" / "ORAL HISTORY PROJECT")
- Right: nav (Home / Browse / Collections / Exhibits / About / Search). Active item has parchment top-rule.

### Footer
- Background: navy (`#0E1B2C`)
- Top border: peach `paperAltBrand` (`#E8A57A`, 4px) — crimson is unreadable on navy, peach is the accent
- 4-column grid: address column + 3 link columns (Explore / The Society / Project)
- Bottom row: copyright + accessibility note in dimmer parchment

## Design Tokens

### Colors (Patriots' Path)

```css
/* Surfaces */
--paper:       #FBFAF7;  /* page background (cream) */
--paper-alt:   #0E1B2C;  /* navy — header strip, footer, breadcrumb, subpage hero */
--accent-soft: #EAF0F7;  /* pale blue — item set cards */

/* Ink (text on light surfaces) */
--ink:       #0E1B2C;  /* navy — body and headings on paper */
--ink-soft:  #3A4A5E;  /* dimmer slate — meta and secondary */

/* Ink on paper-alt (text on navy surfaces) */
--paper-alt-ink:       #F5E9D0;  /* parchment — headings on navy */
--paper-alt-ink-soft:  #C9B98E;  /* dimmer parchment — meta on navy */
--paper-alt-brand:     #E8A57A;  /* warm peach — kickers/links on navy */
--paper-alt-rule:      #1E3148;  /* subtle rule on navy */

/* Brand */
--brand:       #A12C2C;  /* crimson — primary buttons, kickers on light, links */
--brand-ink:   #F5E9D0;  /* text color when on crimson */
--accent:      #0E1B2C;  /* navy — same as paper-alt; header bar bg */

/* Lines */
--rule: #D7DCE3;  /* dividing rule on light surfaces */
```

**Critical contrast rule:** any text or icon placed on `--paper-alt` (navy) MUST use `--paper-alt-ink`, `--paper-alt-ink-soft`, or `--paper-alt-brand` — never `--ink` or `--brand`. Navy-on-navy is invisible.

### Typography

```css
--font-display: "Bitter", "Roboto Slab", Georgia, serif;       /* H1, H2, narrator names */
--font-body:    "Inter", system-ui, -apple-system, sans-serif; /* body, UI, buttons */
--font-mono:    "JetBrains Mono", ui-monospace, monospace;     /* kickers, meta, timestamps */
```

Load via Google Fonts: `family=Bitter:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;700`

**Type scale (4px grid):**
- H1 (page title): 48px / 1.05 / 600 (display)
- H1 (subpage hero): 44px / 1.1 / 600 (display)
- H2 (section title): 28px / 1.2 / 600 (display)
- H3 (card title): 18–20px / 1.3 / 600 (display)
- Body large: 17px / 1.6 / 400 (body)
- Body: 15px / 1.6 / 400 (body)
- Body small: 13px / 1.5 / 400 (body)
- Kicker / meta: 11px / 1 / 700, uppercase, letter-spacing 0.18em (mono)
- Tiny meta: 10–11px / 1 / 500, letter-spacing 0.05–0.1em (mono)

### Spacing & Geometry
- Border radius: `6px` (`var(--radius)`)
- Card shadow: `0 8px 24px -16px rgba(14,27,44,0.35), 0 1px 0 rgba(14,27,44,0.06)`
- Section vertical padding: `64px` desktop, `40px` mobile
- Section horizontal padding: `48px` desktop, `24px` mobile
- Max content width: `1200px` (chrome), `1100px` (most sections), `900px` (search), `720px` (About body copy)
- Grid gaps: `20–32px`

## Interactions & Behavior

- **Hover states:** links go from `--ink-soft` to `--ink` (or `--brand` for primary actions). Buttons: 4% darken on hover.
- **Focus states:** 2px crimson outline, 2px offset. WCAG 2.1 AA required throughout.
- **Audio sync:** handled by OhmsEmbed module or custom `transcript-player.js`. See transcript section above.
- **Transcript search:** debounce input ~150ms, filter segments client-side, highlight matches with `<mark>` tinted crimson at 25% alpha.
- **Citation copy-to-clipboard:** `navigator.clipboard.writeText()`, show a 2s "Copied" toast.
- **Item set card hover:** subtle lift (`translateY(-2px)`) + shadow deepens.
- **Hero photo rotation:** 6s interval, 600ms crossfade. Pauses on hover. Respects `prefers-reduced-motion`.

## Accessibility (required)

- WCAG 2.1 AA. Keyboard-navigable end to end.
- All audio players must have visible transcripts with proper ARIA labels.
- Transcript segments are `<button>`s, not `<div onclick>`s.
- Skip-to-main-content link at top of every page.
- All images need `alt` attributes — pull from Omeka's file metadata.
- Color contrast: every combination above is AA-compliant; if you tweak, run a contrast checker.

## Local Development

### Prerequisites

- Docker and Docker Compose

### Setup

```bash
cp .env.sample .env    # fill in passwords (dev defaults already work)
docker compose up -d   # starts nginx (8080), omeka-s (PHP-FPM), mariadb
```

Visit `http://localhost:8080/install` to run the Omeka S install wizard. After setup:

1. Create a site in admin
2. Select the "AHS Oral History" theme
3. Create an API key: **User > API Keys > New key**
4. Add key values to `.env` as `OMEKA_KEY_IDENTITY` and `OMEKA_KEY_CREDENTIAL`
5. Seed sample data: `python3 seed.py`
6. Assign item sets to the site: **Admin > Sites > [site] > Resources**

### Services

| Service | URL | Notes |
|---|---|---|
| Omeka S | `http://localhost:8080` | Public site + admin |
| MariaDB | internal (port 3306) | `omeka` / `omeka` |

### Theme development

The `theme/` directory is bind-mounted into both the nginx and omeka-s containers. Edits to templates, CSS, and JS are reflected immediately on page refresh — no container restart needed.

### Modules

Module zip files are extracted and copied into the container's `/var/www/html/modules/` directory. Activate them in **Admin > Modules**. Currently installed:

- **FacetedBrowse** — faceted search/filtering
- **OhmsEmbed** — OHMS transcript sync
- **AdvancedSearch** — enhanced search (requires Common module for full functionality)
- **BulkImport / BulkExport** — batch data import/export
- **EasyAdmin** — admin utilities
- ActivityLog, ApiInfo, BotChallenge, Coins, BulkEdit

Note: modules live in a Docker volume, not the repo. After `docker compose down -v` (which removes volumes), modules will need to be re-installed.

### Seed script

`seed.py` populates Omeka S with sample data from the prototype: 6 item sets and 8 interview items with full Dublin Core metadata. Reads API credentials from `.env` or accepts them as arguments:

```bash
python3 seed.py                           # reads from .env
python3 seed.py KEY_IDENTITY KEY_CREDENTIAL  # or pass directly
```

## Project Files

- `README.md` — this file
- `TODO.md` — task tracking
- `docker-compose.yml` — Docker dev environment (nginx + PHP-FPM + MariaDB)
- `docker/` — nginx config, Omeka S Dockerfile and config
- `.env` / `.env.sample` — environment variables (DB credentials, API keys)
- `seed.py` — sample data seeder
- `theme/` — the Omeka S theme (bind-mounted into containers)
- `prototype/` — design reference files (HTML/React, not production code)
  - `AHS Oral History Theme.html` — entry point
  - `data.js` — sample data
  - `shell.jsx` — header, footer, logomark
  - `prototype-shared.jsx` — theme tokens, HomePage
  - `prototype-pages.jsx` — all other pages
  - `tweaks-panel.jsx` — design-time UI, ignore

To run the prototype: open `prototype/AHS Oral History Theme.html` in a browser.

## Open Questions for AHS

- Confirm hosting environment (managed Reclaim/Omeka.net vs self-hosted) — affects module availability.
- Confirm audio file format and transcript authoring workflow (OHMS vs manual vs Whisper + cleanup).
- Confirm whether AHS has an existing logomark or whether the SVG mark in the prototype is acceptable.
- Confirm which Omeka S exhibit module to use.
