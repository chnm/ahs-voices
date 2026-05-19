# AHS Oral History Theme — TODO

## Completed

- [x] Docker dev environment (nginx + PHP-FPM + MariaDB)
- [x] Theme scaffolding and CSS design tokens
- [x] Shared chrome: pre-header, header (logo + divider + wordmark), footer
- [x] Configurable theme settings (logo, subtitle, hero headline, footer description, nav depth)
- [x] Site title pulled from admin (not hardcoded)
- [x] Pre-header links wired to AHS website
- [x] Homepage: hero with random item image + fallback historical photos, summary from site settings, recent items, collections grid
- [x] Admin page blocks rendered between hero and recent items on homepage
- [x] Browse interviews page with metadata, tags, truncated descriptions
- [x] Item set browse with card grid
- [x] Single interview page: two-column layout (transcript left, metadata sidebar right)
- [x] Audio/video player (sticky) with transcript sync (clickable [HH:MM:SS] timestamps)
- [x] Citation generator (Chicago/MLA/APA with copy to clipboard)
- [x] Child page navigation (auto-detected from nav tree, rendered as cards)
- [x] Faceted browse template override and styling
- [x] Custom oral history vocabulary (transcript, transcriptStatus, transcriber, interviewLocation, seriesTitle)
- [x] Resource template: "Oral History Interview" (created via seed script)
- [x] Seed script with --template-only flag
- [x] Automatic module installation from plugins/ on container startup
- [x] Transcript parser script (scripts/parse-transcript.py) for docx imports
- [x] Two real interviews loaded (Pelton & Whipple) with audio and transcripts
- [x] Description truncation on all browse/card views
- [x] DEVNOTES.md with full setup and workflow documentation

## In Progress / Next

- [ ] Clean up transcript parser output (speaker attribution drift in multi-paragraph turns)
- [ ] Ask transcribers to provide plain text format going forward
- [ ] Import oral history vocabulary in admin (one-time step, see DEVNOTES)

## Theme & Styling

- [ ] Mobile responsive nav (hamburger toggle JS)
- [ ] Mobile breakpoint testing (sidebar collapse, hero stacking)
- [ ] Add `theme.jpg` screenshot for admin UI
- [ ] Transcript search box with debounced filtering and `<mark>` highlighting
- [ ] Auto-scroll active transcript segment into view during playback
- [ ] Style the search/advanced search pages

## Content & Data

- [ ] Delete old dummy item sets (MA-themed) from admin
- [ ] Receive and upload remaining interview audio + transcripts from AHS
- [ ] Receive narrator portraits / photos
- [ ] Configure item sets for real collections (beyond Project Shirlington)

## Modules

- [ ] Configure FacetedBrowse: set up facets (item set, topic, neighborhood)
- [ ] Evaluate whether to keep FacetedBrowse or use simpler browse filtering
- [ ] Decide on exhibit module (if exhibits are needed)

## Accessibility & QA

- [ ] WCAG 2.1 AA audit
- [ ] Keyboard navigation testing (transcript player, citation generator, nav)
- [ ] Screen reader testing
- [ ] Color contrast verification
- [ ] Cross-browser testing (Chrome, Firefox, Safari)

## Open Questions

- [ ] Confirm hosting environment with AHS (Reclaim, self-hosted, etc.)
- [ ] Confirm transcript workflow: plain text preferred, docx parser available as fallback
- [ ] Determine if Cleveland Voices player component is worth integrating
