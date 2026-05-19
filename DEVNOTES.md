# Development Notes

## Getting Started

```bash
docker compose up -d          # starts nginx (8080), omeka-s (PHP-FPM), mariadb
python3 seed.py               # populates resource template + sample data
```

- **Site:** http://localhost:8080/s/arlington-voices
- **Admin:** http://localhost:8080/admin

The theme is bind-mounted — edits to `theme/` are live on refresh.

## Modules

Module zip files live in `plugins/`. They are automatically unzipped into Omeka's `modules/` directory on container startup via `docker/omeka-s/install-modules.sh`. After a fresh `docker compose up`, go to Admin > Modules to activate them.

To add a new module: drop the `.zip` into `plugins/` and restart the container.

## Custom Vocabulary: Oral History

The file `vocabularies/oral-history.ttl` defines the `oralhistory` namespace for oral history metadata. This must be imported manually via the admin (one-time step):

1. Admin > Vocabularies > Import new vocabulary
2. **Label:** Oral History
3. **Namespace URI:** `http://rrchnm.org/vocab/oral-history#`
4. **Namespace prefix:** `oralhistory`
5. Upload `vocabularies/oral-history.ttl`

### Properties

| Property | Label | Description |
|---|---|---|
| `oralhistory:transcript` | Transcript | Full interview transcript text. May include `[HH:MM:SS]` timestamps for audio sync. |
| `oralhistory:transcriptStatus` | Transcript Status | draft / reviewed / final |
| `oralhistory:transcriber` | Transcriber | Person or service that produced the transcript |
| `oralhistory:interviewLocation` | Interview Location | Where the interview was conducted |
| `oralhistory:seriesTitle` | Series Title | Oral history series or project name |

After import, add relevant properties to the "Oral History Interview" resource template in Admin > Resource Templates.

## Transcript Format

The `oralhistory:transcript` field expects plain text with timestamps in `[HH:MM:SS]` format. The theme's JavaScript automatically converts these into clickable links that seek the audio player.

**Expected format:**

```
[00:00:06] Marty Suydam
Today's date is September 24th, 2025. The title of this oral history is...

[00:00:38] Joe Pelton
Good morning. My name is Joe Pelton. I have been involved with the
Shirlington Redevelopment since it began...

[00:01:30] Marty Suydam
How did Hurricane Agnes stir and influence the redevelopment of Shirlington?
```

Rules:
- Each speaker turn starts with `[HH:MM:SS] Speaker Name` on its own line
- The spoken text follows on subsequent lines
- Blank lines separate speaker turns
- Timestamps must match the audio recording

Transcripts can be entered directly in the Omeka admin item editor or provided as plain text files. A rough parser exists at `scripts/parse-transcript.py` for converting docx table-format transcripts, but the two-column table format used by some transcribers is inconsistent — expect to hand-edit the output. Prefer asking transcribers for plain text in the format above.

## Resource Template

The seed script creates an "Oral History Interview" resource template with these Dublin Core fields:

| Field | Property | Required |
|---|---|---|
| Interviewee Name | dcterms:title | Yes |
| Summary | dcterms:description | Yes |
| Life Dates | dcterms:date | No |
| Date Recorded | dcterms:created | Yes |
| Topics | dcterms:subject | No |
| Interviewer | dcterms:contributor | No |
| Duration | dcterms:extent | No |
| Neighborhood | dcterms:spatial | No |

To create just the template without sample data:

```bash
python3 seed.py --template-only
```

## Theme Settings

Configurable in Admin > Appearance > Theme Settings:

- **Logo** — optional image displayed in the header with a divider before the site title
- **Site Subtitle** — appears below the site title in the header
- **Hero Headline** — main heading on the homepage hero section
- **Footer Description** — short text in the footer's first column
- **Navigation Depth** — max levels of nav to display (default 1)

The homepage hero summary text is pulled from the site's **Summary** field (Admin > Sites > Edit).

## Resetting the Environment

```bash
docker compose down -v        # removes containers AND volumes (database, modules)
docker compose up -d          # fresh start — modules auto-install from plugins/
python3 seed.py               # re-seed data and resource template
```

After a full reset, you will need to:
1. Complete Omeka S installation at http://localhost:8080/install
2. Create API keys and update `.env`
3. Re-import the oral history vocabulary (see above)
4. Activate modules in Admin > Modules
