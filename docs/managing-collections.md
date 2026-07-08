# Managing Collections (Item Sets)

This guide is for the people who manage the archive. It covers creating a **collection** — a group of interviews on a shared subject or story — giving it a picture and description, and making it show up on the website.

> **A note on words.** On the public site these are called **Stories** or **Collections**. Behind the scenes in the admin, Omeka calls them **Item sets**. They're the same thing: a collection is an item set, and the interviews inside it are items. This guide says "collection" for the idea and "item set" when you're clicking the actual admin menu.

---

## Before you start

Have these ready:

- [ ] **A name** for the collection (e.g. "Project Shirlington").
- [ ] **A short description** — one or two sentences.
- [ ] **A picture** (optional). A collection can borrow a photo from one of its interviews automatically, but you can also give it its own image.
- [ ] **The interviews** you want to include should already exist as items (see [Adding an Oral History](adding-oral-histories.md)). You can also add interviews to the collection later.

---

## Step 1: Create the collection

1. In the left-hand admin menu, under **Resources**, click **Item sets**.
2. Click the green **Add new item set** button (top right).

> **📷 Screenshot:** *The Item sets list, with "Item sets" highlighted in the left menu and the "Add new item set" button top-right.*
<!-- image → docs/images/collections/item-sets-list.png -->

## Step 2: Fill in the details

On the **Values** tab you'll see fields for the collection. Fill in these three:

| Field | What it's for |
|---|---|
| **Title** | The collection's name. Shows everywhere the collection appears. |
| **Description** | A short teaser. This is the text shown on the **collection cards** (the homepage "Explore by theme" section and the Collections page). |
| **Abstract** | A short summary shown on the collection's **own landing page**, next to its picture. |

If a field isn't already showing, add it from the property list on the right: open the **Dublin Core** group, then click **Description** or **Abstract** to add it to the form. Type your text in the box that appears.

> **📷 Screenshot:** *The Values tab showing the Title, Description, and Abstract fields filled in; the Dublin Core property group open on the right.*
<!-- image → docs/images/collections/item-set-values.png -->

> **Description vs. Abstract — why both?** The **description** is the teaser on cards; the **abstract** is the intro on the collection's landing page. They can say similar things. If you only fill in one, fill in the **description** — the cards are the more visible spot.

## Step 3: Give it a picture (optional)

1. Click the **Advanced** tab (next to "Values", near the top).
2. Next to **Thumbnail**, click **Select**.
3. Upload a new image, or pick one you've used before, then choose it.

> **📷 Screenshot:** *The Advanced tab with the Thumbnail area and the selected image.*
<!-- image → docs/images/collections/item-set-thumbnail.png -->

> **You can skip this.** If you don't set a picture, the site automatically borrows the photo from the first interview in the collection that has one. Set a thumbnail here only when you want a specific image instead.

## Step 4: Make it public and save

1. Near the top right, check the **visibility** control (the eye icon). It should be set to **Public** so visitors can see the collection.
2. Click the green **Save** button.

## Step 5: Add interviews to the collection

Interviews are added to a collection from the **interview's** own page, not here:

1. Go to **Items**, open an interview, and click **Edit**.
2. Find the **Item sets** section and choose this collection.
3. **Save.**

(This is also covered as a step in [Adding an Oral History](adding-oral-histories.md#step-5-put-it-in-a-collection-and-on-the-site).) You can add as many interviews to a collection as you like, and an interview can belong to more than one collection.

## Step 6: Show the collection on the site

**This is the step people forget.** Creating a collection does *not* automatically put it on the website — you have to add it to the site.

1. In the left menu, click **Sites**, then open **Arlington Voices** (click the pencil / edit icon).
2. In the site's menu, click **Resources**.
3. Click the **Item sets** tab.
4. In the panel on the right, click your collection to add it to the list.
5. Click **Save**.

> **📷 Screenshot:** *The site's Resources page, Item sets tab, showing the assigned collections list and the "add" panel on the right.*
<!-- image → docs/images/collections/assign-to-site.png -->

> **If a collection is missing from the site,** this is almost always why: it was created but never added under **Resources → Item sets**. It's done from the **site** side, not from the collection's own edit page.

---

## Where your collection appears

Once it's public and added to the site, the collection shows up in three places:

- **Homepage** — the newest collections appear in the "Explore by theme" section (with the picture and description).
- **Collections page** — the full grid of collections.
- **Its own landing page** — the picture and abstract at the top, with the list of interviews below.

---

## Quick reference: the checklist

- [ ] **Item sets → Add new item set**
- [ ] Fill in **Title**, **Description**, and **Abstract**
- [ ] (Optional) **Advanced → Thumbnail →** choose a picture
- [ ] Set to **Public** and **Save**
- [ ] Add interviews (from each interview's **Edit** page → **Item sets**)
- [ ] **Sites → Arlington Voices → Resources → Item sets →** add the collection → **Save**
- [ ] Check it on the public site
