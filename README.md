# Arlington Historical Society — Oral History Project (Omeka S Theme)

## Overview

A custom Omeka S theme for the **Arlington Historical Society's** oral history archive. The site presents recorded interviews with Arlington, VA residents — searchable, browseable, and grouped into thematic collections. Each interview page features a **synced transcript**: clicking any `[HH:MM:SS]` timestamp jumps the audio to that moment.

Developed in collaboration with the [Roy Rosenzweig Center for History and New Media](https://rrchnm.org) at George Mason University.

## Quick Start

```bash
docker compose up -d          # starts nginx (8080), omeka-s (PHP-FPM), mariadb
python3 seed.py               # creates resource template + sample data
```

- **Site:** http://localhost:8080/s/arlington-voices
- **Admin:** http://localhost:8080/admin

See [DEVNOTES.md](DEVNOTES.md) for full setup instructions, vocabulary import, transcript format, and environment reset procedures.

## Architecture

This is an **Omeka S theme** (Laminas `.phtml` templates + CSS + vanilla JS). No build step, no bundler, no Node.js dependency.

- `theme/` — the Omeka S theme (bind-mounted for live editing)
- `plugins/` — module zip files (auto-installed on container startup)
- `vocabularies/` — custom RDF vocabulary for oral history metadata
- `scripts/` — transcript parser and other utilities
- `seed.py` — sample data and resource template seeder
- `prototype/` — design reference files (HTML/React, not production code)

## Key Features

- **Configurable header**: optional logo upload, site title + subtitle, pulled from admin settings
- **Homepage hero**: random item thumbnail or fallback historical photos, editable headline and summary
- **Transcript sync**: `[HH:MM:SS]` timestamps in transcript text become clickable audio seek links
- **Citation generator**: Chicago/MLA/APA with copy to clipboard
- **Child page navigation**: auto-detected from nav tree, rendered as styled cards
- **Custom vocabulary**: `oralhistory:transcript`, `oralhistory:transcriber`, etc.
- **Theme settings**: hero headline, site subtitle, logo, footer description — all editable in admin

## Design

The design direction is **"Patriots' Path"** — navy/crimson/parchment palette, slab-serif headlines (Bitter), Inter for body, JetBrains Mono for metadata. See `theme/asset/css/style.css` for all design tokens as CSS custom properties.

## Project Status

See [TODO.md](TODO.md) for current status and next steps.
