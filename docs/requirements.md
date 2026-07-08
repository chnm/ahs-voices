# Requirements & Roadmap

This document captures client requirements for **Arlington Stories** and organizes them into what we can build now, what comes later, and what needs research before we can act. It is a living document — as issues are opened, worked, and closed, update the status here.

Each item links to a tracked [GitHub issue](https://github.com/chnm/ahs-voices/issues).

---

## Source: Client requirements, 7/2/26

The client provided "a first attempt to identify core requirements." Their vocabulary maps onto Omeka S concepts as follows:

| Client term | Omeka S concept |
|---|---|
| **Interviews** | Items (individual recordings) |
| **Stories** | Item sets (a themed collection of recordings) |
| **Partners** | Participating history organizations (no native concept yet — future) |

---

## Build now (theme work)

The genuinely buildable requests — they require changes to the theme templates. This is the meat of the work.

- [ ] **Homepage: 3 most recent Collections** — the homepage already has a collections section ("Explore by theme"), but it shows 6 item sets unsorted; change it to the 3 most recent, and add a thumbnail to each card. If the section looks missing, the likely cause is item sets not being associated with the site (Admin > Sites > `arlington-voices` > **Resources** > **Item Sets** tab — done from the site side, not the item set), not a code bug. ([#34](https://github.com/chnm/ahs-voices/issues/34))
- [ ] **Story landing pages: thumbnail + description** — surface a thumbnail image and brief description on each Story (item-set) landing page. ([#36](https://github.com/chnm/ahs-voices/issues/36))

## Build later (needs a content model)

Wanted, but blocked on a design decision before any build.

- [ ] **Partners** — a "Partners" nav link plus per-partner landing pages listing each organization's interviews and stories (e.g. the Black Heritage Museum, Memorializing the Enslaved). Shares the "thumbnail + description" pattern with Story landing pages (#36), but needs a design pass first on how a "Partner" is modeled and how its content is associated. ([#37](https://github.com/chnm/ahs-voices/issues/37))

## Already possible in Omeka — needs configuration or a how-to

Not build work. Omeka S already supports these; the gap is an admin step or documentation for the client.

- [ ] **"Stories" navigation link → Item Sets** — an admin step (Admin > Sites > Navigation), not a code change. Add a nav link labeled "Stories" pointing to the item-set browse page. ([#33](https://github.com/chnm/ahs-voices/issues/33))
- [ ] **Basic pages (the client's "most critical module")** — Omeka S site pages are already built from native blocks (HTML/WYSIWYG, Media, Asset). Primarily an **instruction** task. Smaller open questions: whether [Block Plus](https://omeka.org/s/modules/BlockPlus/) is worth installing for column layouts + Exhibit templates, and how to handle image resizing (native support is limited). ([#39](https://github.com/chnm/ahs-voices/issues/39))
- [ ] **Module documentation** — document which modules exist and how they're installed here (zips in `plugins/`, auto-unzipped on startup, activated in Admin > Modules), using the Map module as a worked example. ([#38](https://github.com/chnm/ahs-voices/issues/38))
- [ ] **Assets vs. Media** — document the difference between Assets (reusable site/theme images) and Media (files attached to items), and investigate whether "Media" can be relabeled in the UI to reduce confusion. ([#40](https://github.com/chnm/ahs-voices/issues/40))

## Not planned

Requested, but deliberately not building.

- **Homepage "Featured" section / Exhibits** — "Featured" items and "Exhibits" were Omeka **Classic** features with no native Omeka S equivalent. Reconstituting them would mean custom scaffolding that's likely to break on future Omeka S upgrades, so we're not doing it. Closed as `wontfix`. ([#35](https://github.com/chnm/ahs-voices/issues/35))

---

## Notes on scoping decisions

- **The buildable core is the homepage collections + landing-page work** (#34, #36, and #37 once modeled). Everything else in the client's list is something Omeka already does (admin steps or documentation) or something we've decided not to build (#35).
- **"Featured" and "Exhibits"** don't exist in Omeka S. The client's request reflects Omeka Classic behavior; see #35 for why we're not reconstituting it.
