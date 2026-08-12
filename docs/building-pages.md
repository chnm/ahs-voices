# Building and Editing Site Pages

This guide is for staff and volunteers creating interpretive pages in Arlington Stories—for example, an About page, a historical essay, a project introduction, or a small online exhibit.

You do **not** need an additional module to create a page with formatted text, images, audiovisual material, links, and multi-column layouts. Omeka S provides these features through page **blocks**. The official [Site Pages](https://omeka.org/s/docs/user-manual/sites/site_pages/) manual includes screenshots of the interface and every native block.

## How pages and blocks work

A site page is assembled from individual blocks, each responsible for one kind of content. Blocks can be added, configured, reordered, grouped, and removed without editing a theme template.

The most useful blocks for this project are:

| Block | Use it for |
|---|---|
| **HTML** | Formatted text, headings, lists, quotations, and links. |
| **Asset** | A standalone image used on a page, such as a photograph, logo, diagram, or banner. |
| **Media embed** | Image, audio, video, or other media already attached to an Omeka item. |
| **Browse preview** | A live list or grid of items, item sets, or media selected by a query. |
| **List of pages** | A hand-selected list of links to other pages in the same site. |
| **Table of contents** | Navigation for child pages beneath the current page. |
| **oEmbed** | Content hosted by a supported service such as YouTube, Vimeo, or SoundCloud. |
| **Line break** | Spacing or a visual break between sections. |
| **Map by query / attachments / groups** | Interactive maps when the Mapping module is active. |

Modules may add more blocks, but start with the native choices above. Fewer block types make a page easier to maintain.

## Step 1: Create a page

1. Log in to Omeka and select **Sites**.
2. Edit **Arlington Stories** using its pencil icon.
3. Select **Pages** in the site administration menu.
4. Click **Add new page**.
5. Enter a clear **Title**.
6. Optionally edit the **URL slug**. Use lowercase words separated by hyphens, such as `freedmans-village-history`.
7. Choose whether to **Add to navigation**. Leave this unchecked if the page should be a child page or if you want to position it manually later.
8. Use the eye icon to choose **Public** or **Private**. Private is best while drafting.
9. Click **Add** to open the page editor.

> The theme already displays the page's title in a large header. Do not add a separate **Page title** block unless you intentionally want the title repeated in the page content.

## Step 2: Choose a layout mode

Omeka provides two native layout modes:

- **Normal flow** stacks blocks in reading order and lets text wrap around aligned media. Use this for most essays and informational pages.
- **Grid** divides a page into columns. Each block receives a position and a span (width). Use it only when the page genuinely needs side-by-side sections or a deliberate multi-column composition.

Start with **Normal flow**. It is easier to edit and produces the most predictable results on phones and tablets. If you use Grid, preview the page at both wide and narrow browser widths before publishing.

## Step 3: Add and format text

1. Select **HTML** from the block list on the right.
2. Click inside the editing area to reveal the formatting toolbar.
3. Enter or paste the page text.
4. Use the toolbar for paragraph styles, headings, bold, italics, lists, quotations, and links.
5. Use meaningful heading levels in order: start page sections with Heading 2, then use Heading 3 for subsections. Do not use headings merely to make text look larger.
6. Apply changes, then save the page.

When pasting from Word or Google Docs, check the result for unexpected fonts, spacing, or colors. If necessary, paste as plain text and reapply simple formatting in Omeka.

The **Source** button permits raw HTML, but most editors should avoid it. Embedded code can break responsive layouts or introduce inaccessible content. Use a purpose-built block whenever one exists.

## Step 4: Add an image

Choose the block based on what the image represents:

- Use **Asset** for an image that belongs to the page itself and is not part of an archival item.
- Use **Media embed** when the image or audiovisual file is already attached to an Omeka item and should remain connected to that record.

For a typical editorial image with wrapping text:

1. Add the **Asset** or **Media embed** block **before** the related HTML block.
2. Select or upload the image. Media embed selections come from media already attached to items.
3. Add a concise caption and credit when appropriate.
4. For Media embed, choose a suitable image type such as **medium** or **large**.
5. Apply the block changes and save the page.
6. View the public page and confirm the image, caption, and surrounding text read correctly.

### Image sizing in this theme

Arlington Stories deliberately standardizes editorial Asset and Media blocks:

- on wider screens, an image floats to the right at approximately 340 pixels wide, never exceeding 42% of the text column;
- text in the following HTML block wraps around it; and
- below 700 pixels, the image stacks at full width above the text.

This behavior is defined in [`theme/asset/css/page-blocks.css`](../theme/asset/css/page-blocks.css). Editors normally should not resize images with inline HTML or fixed pixel dimensions.

For a special layout, first try Omeka's **Grid** mode and block span settings on a private test page. Because the theme applies its own editorial image treatment, check the public result carefully. If the design needs a full-width hero, unusually small image, or a repeatable custom pattern, ask the theme maintainer to add a named style instead of pasting one-off CSS into the page.

## Step 5: Add archival or dynamic content

### Show an item or recording

Use **Media embed** to select a specific image, audio recording, or video attached to an item. Use **Item with metadata** when the page should show the item's descriptive record as well as its media.

### Show a changing list of resources

Use **Browse preview** to display items, item sets, or media matching a query. This is better than manually maintaining links when the list should update as new resources are added.

### Link a set of related pages

Use **List of pages** for a curated list. Use **Table of contents** when the pages are arranged as children of the current page in **Site → Navigation**.

### Add a map

When Mapping is active, use **Map by query** for a map generated from matching items or **Map by attachments** for hand-selected resources. See the [Mapping documentation](https://omeka.org/s/docs/user-manual/modules/mapping/#add-maps-to-a-site) for block options.

## Step 6: Reorder and group blocks

- Drag a block by its handle to move it earlier or later in the reading order.
- Use the gear icon to open layout settings for an individual block.
- Use **Add block group** to keep related blocks together and apply shared spacing, background, or alignment.
- In Normal flow, place an image or media block before the HTML block whose text should wrap around it.
- Remember that deleting a block group also deletes the blocks inside it.

The visual order should also be the logical reading order. Do not rely on columns to make unrelated source-order content appear connected.

## Step 7: Save, preview, and publish

1. Save the page frequently.
2. Use **View** to open the public page.
3. Check headings, links, captions, and reading order.
4. Resize the browser or inspect the page on a phone to check wrapping and stacking.
5. Confirm that images are clear and audiovisual material plays.
6. Add or arrange the page under **Site → Navigation** if visitors need it in the menu.
7. Change the page from Private to Public when review is complete.

Changes do not appear publicly until the page is saved.

## Special case: editing the homepage

The Arlington Stories homepage is partly controlled by the theme. Page blocks entered on the homepage are displayed in an editorial area, but the hero, recently added interviews, and “Explore by Stories” sections are generated automatically by the theme.

Use homepage blocks for introductory or supporting editorial content. Do not try to recreate the theme-generated sections with duplicate blocks. Site-wide hero text and other configurable labels are managed under **Site → Theme → Theme settings** and in the site's Summary field.

## Do we need Block Plus?

**Recommendation: no, not for ordinary pages.** Omeka S 4.2 already includes formatted HTML, Asset and Media blocks, block groups, Normal flow, and Grid layouts. Those native tools satisfy the requirement for basic pages with text, media, formatting, and image placement.

[Block Plus](https://omeka.org/s/modules/BlockPlus/) version 3.4.45 and its required **Common** dependency are already bundled in this repository, so they can be activated later without adding another ZIP. Block Plus becomes useful when the archive has a specific need for:

- reusable page models or preconfigured groups of blocks;
- the supplied **Simple page**, **Exhibit**, or **Exhibit page** models;
- a repeatable “Resource with text” group;
- advanced blocks such as mirror pages, galleries, showcases, graphs, or enhanced search forms; or
- a consistent multi-page exhibit workflow that has been tested with the theme.

It also introduces more interface choices, dependencies, and theme-testing work. Several of its older features now overlap with capabilities added to Omeka core in version 4.1 and later. Leave it inactive unless a defined page pattern needs it.

### Safely evaluate Block Plus

1. Work in the local or staging environment.
2. Under **Admin → Modules**, install or activate **Common** first, then **Block Plus**.
3. Create a private test page rather than converting a published page.
4. Try the native tools and the relevant Block Plus page model side by side.
5. Test the public result on desktop and mobile.
6. Adopt the module only if the model saves meaningful editorial work and produces a stable result in this theme.

See [Managing Omeka S Modules](managing-modules.md) for activation and deployment details.

## Troubleshooting

### The page exists but visitors cannot find it

Confirm that the page is Public and has been added under **Site → Navigation**. A public page can exist without appearing in the menu.

### Text does not wrap around an image

In Normal flow, move the Asset or Media block before the related HTML block. Save and refresh the public page.

### The image is the wrong size

First verify that the public page is using this theme and that the image is in an Asset or Media block. Try the intended thumbnail size for Media embed. For exceptional layouts, test Grid mode or request a reusable theme style; avoid hard-coded inline dimensions.

### A block is unavailable

Native blocks should always be present. Map blocks require Mapping to be active; Block Plus blocks require Common and Block Plus to be installed and active. Check **Admin → Modules** or ask a Global Administrator.

### The homepage does not match the block order

The homepage uses a custom theme layout. Its automatic hero, recent interviews, and story cards are not represented by page blocks in the editor.

## Publishing checklist

- [ ] Page has a clear title and readable URL slug
- [ ] Drafted as Private until reviewed
- [ ] Headings follow a logical order
- [ ] Links work and use descriptive text
- [ ] Images have appropriate captions, credits, and alternative text where available
- [ ] Asset and Media blocks are used consistently
- [ ] Page checked at desktop and mobile widths
- [ ] Page added to navigation if visitors should find it there
- [ ] Visibility set to Public when approved

## Related documentation

- [Managing Omeka S Modules](managing-modules.md)
- [Adding an Oral History](adding-oral-histories.md)
- [Managing Collections](managing-collections.md)
- [Omeka S: Site Pages](https://omeka.org/s/docs/user-manual/sites/site_pages/)
- [Omeka S: Mapping](https://omeka.org/s/docs/user-manual/modules/mapping/)
- [Block Plus](https://omeka.org/s/modules/BlockPlus/)
