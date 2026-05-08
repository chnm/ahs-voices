# AHS Oral History Theme — TODO

## Setup & Scaffolding

- [x] Set up Omeka S dev environment (Docker: nginx + PHP-FPM + MariaDB)
- [x] Scaffold theme directory structure (`config/theme.ini`, `view/`, `asset/`)
- [x] Create `config/theme.ini` with metadata and theme settings
- [ ] Add `theme.jpg` screenshot for admin UI
- [ ] Initialize git repo

## CSS & Design Tokens

- [x] Create `asset/css/style.css` with CSS custom properties (all design tokens)
- [x] Load Google Fonts (Bitter, Inter, JetBrains Mono)
- [x] Implement type scale, spacing, and geometry variables
- [x] Base reset / normalize styles

## Shared Chrome (`layout.phtml`)

- [x] Master layout template with `<head>`, asset loading, content slot
- [x] Skip-to-main-content link
- [x] Pre-header strip (navy, mono, AHS links)
- [x] Header bar (logomark SVG, wordmark, navigation, active state)
- [x] Footer (navy, peach top-border, 4-column grid, copyright)
- [ ] Mobile responsive nav (hamburger/accordion — CSS breakpoints exist, JS toggle needed)

## Pages

### Home (`page/show.phtml` homepage + `index/index.phtml` fallback)
- [x] Hero section (navy bg, headline, CTA buttons)
- [ ] Hero rotating photo (currently placeholder)
- [ ] Featured interview section (portrait, pull quote, link)
- [x] Recently added grid (4-column cards via Omeka API)
- [x] Item set grid (3x2, `accentSoft` cards with crimson top-rule via Omeka API)

### Browse Interviews (`item/browse.phtml`)
- [x] Subpage hero (navy)
- [ ] Filter sidebar (item set, decade, topic, neighborhood) — placeholder, needs FacetedBrowse
- [x] Results list with sort dropdown (via Omeka core)
- [x] Result row layout (thumb, name, summary, meta, tags)

### Single Interview (`item/show.phtml`)
- [x] Breadcrumb strip
- [x] Interview hero (portrait, H1, meta strip)
- [x] Two-column layout (main + sidebar)
- [x] Audio playback (via Omeka media embeds)
- [ ] Custom audio player (sticky, navy bg, scrubber, speed selector) — currently using Omeka default
- [ ] Transcript display with synced highlighting (depends on OHMS/Transcript module)
- [ ] Transcript search box with debounced filtering
- [x] Sidebar: topics, interviewer, collection links
- [x] Sidebar: citation generator (Chicago/MLA/APA tabs, copy button) — working
- [ ] Sidebar: related interviews
- [ ] Sidebar: download links

### Item Sets (`item-set/browse.phtml`)
- [x] Subpage hero
- [x] 2-column card grid (`accentSoft` bg)

### Single Item Set (`item-set/show.phtml`)
- [x] Subpage hero with item set metadata
- [ ] Interview list (needs testing — template exists but may need Omeka query work)

### Search (FacetedBrowse overrides)
- [ ] Override FacetedBrowse templates to match design
- [ ] Search hero with input and suggested searches
- [ ] Faceted sidebar
- [ ] Result rows with transcript snippet highlights

### Exhibits
- [ ] Exhibit browse page (hero + exhibit rows)
- [ ] Single exhibit page

### About (site page)
- [x] Editorial layout styles (720px max-width, slab headlines, serif body)
- [x] Subpage hero rendering

## JavaScript

- [ ] Transcript player (`asset/js/transcript-player.js`)
  - [ ] Synced highlighting on `timeupdate`
  - [ ] Click-to-seek on transcript segments
  - [ ] Auto-scroll active segment into view
  - [ ] Transcript search with debounce + `<mark>` highlighting
  - [ ] Playback speed selector
- [x] Citation generator (copy to clipboard, format switching, real metadata)
- [ ] Hero photo rotation (6s interval, crossfade, `prefers-reduced-motion`)
- [ ] Item set card hover animation
- [ ] Mobile nav toggle

## Modules & Integration

- [x] Install FacetedBrowse, OhmsEmbed, AdvancedSearch, and other modules
  - [ ] Configure FacetedBrowse: set up facets (item set, decade, topic, neighborhood)
  - [ ] Configure OhmsEmbed (or Transcript module) — determine OHMS vs WebVTT workflow with AHS
  - [ ] Override module templates to match theme design
- [ ] Install Numeric Data Types (for date facets) — not in current module set
- [ ] Set up exhibit module — not in current module set
- [ ] Create "Oral History Interview" resource template in admin

## Sample Data

- [x] Seed script (`seed.py`) populates 6 item sets and 8 interview items
- [x] Item sets assigned to site
- [x] Site navigation configured (Home, Browse Interviews, Collections, About)
- [x] Dummy audio + transcript on McGrath item for testing

## Content & Assets

- [ ] Receive logo files from AHS (or finalize prototype SVG logomark)
- [ ] Receive hero photography
- [ ] Receive sample interview audio (MP3) and transcripts
- [ ] Receive narrator portraits (or implement SVG fallback from prototype)

## Accessibility & QA

- [ ] WCAG 2.1 AA audit (axe DevTools or similar)
- [ ] Keyboard navigation testing (all pages, transcript player, citation generator)
- [ ] Screen reader testing (transcript segments as `<button>`s, ARIA labels on player)
- [ ] Color contrast verification on all surface/ink combinations
- [ ] Mobile breakpoint testing (collapse sidebar at ~768px, stack interview hero)
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

## Open Questions

- [ ] Confirm hosting environment with AHS
- [ ] Confirm audio format and transcript authoring workflow (OHMS vs WebVTT)
- [ ] Confirm logomark decision
- [ ] Confirm exhibit module choice for Omeka S
- [ ] Determine if AdvancedSearch Common module dependency is needed
