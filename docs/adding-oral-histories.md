# Adding an Oral History to Arlington Stories

This guide is for staff and volunteers who manage the archive. It covers the complete workflow for adding one interview, from gathering the files to checking the finished page.

The field names below come from this project's **Oral History Interview** resource template. For general help with the Omeka interface, see the official documentation for [items](https://omeka.org/s/docs/user-manual/content/items/), [media](https://omeka.org/s/docs/user-manual/content/media/), and [item sets](https://omeka.org/s/docs/user-manual/content/item-sets/).

> **Before using this guide:** an administrator must have installed the custom Oral History vocabulary and created the **Oral History Interview** resource template. If that template is missing, stop and ask an administrator to follow the [project setup instructions](../DEVNOTES.md#oral-history-vocabulary).

---

## Before you start: gather your materials

It's much easier if you have everything in one place before you begin. For each interview, collect:

- [ ] **The audio (or video) recording** — an `.mp3`, `.m4a`, or `.mp4` file works.
- [ ] **The transcript** — a typed version of what was said. You will paste plain text into Omeka, even if the working copy is a Word document.
- [ ] **A photo** — a picture of the interviewee, or a relevant historical photo. This becomes the thumbnail people see in listings. Optional but nice to have.
- [ ] **The basic facts** — who was interviewed, who did the interviewing, when it was recorded, and a short summary of what it's about.
- [ ] **Permission to publish** — confirm that the archive may publish the recording, transcript, and photograph according to its release and rights policies.

---

## Step 1: Log in

1. Go to the site's admin address — for example, `https://staging.arlingtonstories.com/admin`.
2. Enter your username (email) and password.

If you don't have a login yet, ask the site administrator to create one for you.

> The **admin** side (`/admin`) is the behind-the-scenes area where you add and edit content. The **public** side (the regular website) is what visitors see. You'll do your work in admin, then check your results on the public site.

## Step 2: Start a new interview

1. In the left-hand menu, click **Items**.
2. Click the **Add new item** button (top right).
3. Before filling anything in, look for the **Resource template** dropdown near the top and choose **"AHS Oral History Interview."**

This last step is important. Choosing the template sets up all the right fields (Interviewee Name, Summary, Transcript, and so on) in the correct order. If the form looks bare or the field names don't match this guide, double-check that the template is selected.

For a tour of the full item form, see [Items: Add an item](https://omeka.org/s/docs/user-manual/content/items/#add-an-item) in the Omeka S manual.

## Step 3: Fill in the details

The form is organized into fields. A few are **required** and the rest are optional but make the entry richer.

### The essentials (required)

| Field | What to put here |
|---|---|
| **Interviewee Name** | The person who was interviewed (e.g. *Mary Margaret Whipple*). This becomes the title of the page. |
| **Summary** | A paragraph describing who this person is and what the interview covers. This appears prominently on the interview page. |
| **Date Recorded** | When the interview was recorded. Prefer the unambiguous `YYYY-MM-DD` format, such as `2003-05-14`; use `YYYY` when only the year is known. |

### Recommended extras (optional, but worth adding)

| Field | What to put here |
|---|---|
| **Lede** | A short one- or two-sentence teaser. This is what shows up in browse listings and search results, so a clear summary here helps people decide to click. If you leave it blank, the longer Summary is used instead. Omeka stores this in the Dublin Core **Abstract** property. |
| **Topics** | Keywords or themes covered (e.g. *schools*, *redevelopment*, *civic life*). Add as many as you like — click the **+** to add another. These power the filters people use to browse by theme, so consistent wording helps. |
| **Interviewer** | Who conducted the interview. Enter the name in the archive's standard form, such as `Interviewed by Margaret Chen`. |
| **Neighborhood** | The Arlington neighborhood the interview relates to (e.g. *Shirlington*). |
| **Series Title** | The project or series this belongs to (e.g. *Project Shirlington*). |
| **Duration** | How long the recording runs (e.g. *1:12:30*). |
| **Life Dates** | The interviewee's birth/death years, if known and appropriate to share. |
| **Interview Location** | Where the interview took place. |

### The transcript

| Field | What to put here |
|---|---|
| **Transcript** | Paste the full text of the interview here. |
| **Transcript Status** | Mark how finished it is: *draft*, *reviewed*, or *final*. |
| **Transcriber** | Who typed up the transcript (a person or a service). |

> **Make the transcript interactive:** If your transcript includes timestamps in the format **`[HH:MM:SS]`** (for example `[00:14:30]`), the website automatically turns them into clickable links. A visitor can click a timestamp and the audio jumps right to that moment and the transcript highlights along as the recording plays. It's worth adding these if you can; they make the interview much easier to explore.

Use one timestamp at the start of each passage or speaker turn, for example:

```text
[00:00:00] Interviewer: Please introduce yourself.

[00:00:08] Dorothy Henderson: My family has lived in Arlington...
```

Keep timestamps in square brackets and always include two digits each for hours, minutes, and seconds. Do not add styling or links yourself; the theme does that on the public page.

## Step 4: Add the recording and photo

The fields above are the *information about* the interview. Now add the actual files.

1. Select the **Media** tab on the item form.
2. Choose **Upload**, then select your audio or video file.
3. Upload the photo as another media item.
4. After the files appear in the media list, select the photo as the **primary media**. This makes it the thumbnail used on browse pages.

A few notes:

- **Audio and video both work.** `.mp3`, `.m4a`, and `.mp4` files all play in the built-in player on the interview page.
- **Omeka generates the thumbnail sizes.** You don't need to make separate small copies, but begin with a clear, good-quality image and avoid unnecessary blank space around the subject.
- **The first image is used as the portrait** on the interview page. If you upload several images, order the intended portrait before the others.
- You can upload more than one file (for example, an audio recording *and* a photo).

See the Omeka manual for more on [uploading, reordering, and selecting primary media](https://omeka.org/s/docs/user-manual/content/media/#add-media-to-an-item).

## Step 5: Put it in a collection and on the site

Two settings control where the interview shows up.

1. **Assign it to a collection.** Select the **Item sets** tab and add this interview to the relevant collection (e.g. *Project Shirlington*). Collections are how interviews are grouped on the public site. An interview may belong to more than one. See [Managing Collections](managing-collections.md) for the full collection workflow.

2. **Assign it to the site.** Select the **Sites** tab and add **Arlington Stories**. An interview that isn't assigned to the site won't appear in public browse or search results, even if everything else is filled in.

Omeka's item documentation explains both the [Item sets](https://omeka.org/s/docs/user-manual/content/items/#item-sets) and [Sites](https://omeka.org/s/docs/user-manual/content/items/#sites) tabs.

## Step 6: Make it public and save

1. Find the **visibility** setting (usually a **Public / Private** toggle near the top of the form).
   - **Private** = only logged-in staff can see it. Good while you're still working on it.
   - **Public** = anyone visiting the website can see it.
2. When you're ready for the world to see it, set it to **Public**.
3. Click **Save**.

That's it! The interview is now part of the archive.

> Omeka also allows individual metadata values to be private. Check the eye icon beside each value if a field unexpectedly remains hidden on the public page.

## Step 7: Check your work

Always take a look at the finished page on the public site:

1. Open the public website (e.g. `https://staging.arlingtonstories.com`).
2. Go to **Interviews** and find the one you just added.
3. Check that:
   - The audio or video plays.
   - The summary and details read the way you want.
   - The photo appears.
   - If you added timestamps, clicking one jumps the audio to that spot.

If something looks off, go back into admin, open the item, fix it, and save again. Changes appear right away when you refresh the public page.

The finished interview page combines the portrait, summary, collection, descriptive fields, topic tags, and an automatically generated citation:

## Putting an interview on the Map

If the [Mapping module](https://omeka.org/s/docs/user-manual/modules/mapping/) is active, the site can show where interviews are connected to places around Arlington. To map an interview:

1. Open the item in admin (**Items → click the interview → Edit**).
2. Select the **Mapping** tab on the form.
3. Search for the place or use the marker tool to place a point at the relevant location.
4. Save.

The interview will then appear as a pin on the Map page.

## A few good habits

- **Be consistent with Topics, Neighborhoods, and Series Titles.** Reuse established wording instead of creating near-duplicates such as `World War II` and `WWII`.
- **Use Private while drafting.** Set an interview to Public only once it's ready, so half-finished entries don't show up for visitors. You can still review private posts on the website if you're logged into Omeka.
- **You can always come back.** Nothing is set in stone, you can edit any interview later to add a transcript, fix a typo, or swap a photo.
- **One interview = one item.** Each person's interview is its own entry. If someone was interviewed more than once, you can make a separate item for each session.

## Troubleshooting

### The interview does not appear on the public site

Confirm that the item is **Public** and that **Arlington Stories** appears on its **Sites** tab. Site assignment controls whether an item is included in public browse and search results.

### The wrong thumbnail appears

Edit the item, open **Media**, and make the portrait the **primary media**. If there is no usable uploaded image, select a custom thumbnail from the **Advanced** tab.

### The collection name or link is missing

Add the collection on the item's **Item sets** tab. If the collection itself is absent from the public Collections page, follow [Show the collection on the site](managing-collections.md#step-6-show-the-collection-on-the-site).

### Timestamps are not clickable

Check that a playable audio or video file is attached and that timestamps use exactly `[HH:MM:SS]`, including brackets and leading zeroes. For example, use `[00:07:05]`, not `7:05`.

## Quick reference: the publishing checklist

Before setting an interview to Public, confirm:

- [ ] Resource template is **"Oral History Interview"**
- [ ] **Interviewee Name**, **Summary**, and **Date Recorded** are filled in
- [ ] Audio/video file uploaded and playing
- [ ] Photo added (if available)
- [ ] **Lede** written (the teaser for listings)
- [ ] **Topics** added
- [ ] Assigned to a **collection** (item set)
- [ ] Assigned to the **Arlington Stories site**
- [ ] Visibility set to **Public**
- [ ] Checked the finished page on the public site

## Related documentation

- [Managing Collections (Item Sets)](managing-collections.md)
- [Omeka S: Items](https://omeka.org/s/docs/user-manual/content/items/)
- [Omeka S: Media](https://omeka.org/s/docs/user-manual/content/media/)
- [Omeka S: Item Sets](https://omeka.org/s/docs/user-manual/content/item-sets/)
- [Omeka S: Mapping](https://omeka.org/s/docs/user-manual/modules/mapping/)
- [Project setup and developer notes](../DEVNOTES.md)
