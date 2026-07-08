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

- [ ] **Homepage: 3 most recent Collections** — today the homepage shows 6 item sets, unsorted; change to the 3 most recent, each with a thumbnail and brief description. ([#34](https://github.com/chnm/ahs-voices/issues/34))
- [ ] **Homepage: "Featured" section** — promote a hand-picked Item / Collection / Exhibit with a thumbnail and short description. ([#35](https://github.com/chnm/ahs-voices/issues/35))
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

---

## Notes on scoping decisions

- **The buildable core is the homepage + landing-page work** (#34, #35, #36, and #37 once modeled). Everything else in the client's list is something Omeka already does — those become admin steps or documentation, not theme development.
- **Recent Collections (#34)** and **Featured (#35)** are split into separate issues because they're independent homepage features with different editor workflows.
- **"Exhibit"** (referenced under both Home Page and Featured) is not a native Omeka S concept. It's folded into the Featured issue (#35) and the page-blocks issue (#39, via Block Plus's Exhibit templates) rather than tracked on its own.
