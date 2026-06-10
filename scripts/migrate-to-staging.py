#!/usr/bin/env python3
"""Migrate items from local Omeka S to staging.

Reads credentials from .env (local) and .env.prod (staging).
Migrates item sets, items with all metadata, and media files.
"""

import json
import os
import sys
import urllib.request
import urllib.parse
import tempfile

LOCAL_API = "http://localhost:8080/api"
STAGING_API = "https://staging.arlingtonstories.com/api"
STAGING_SITE_ID = 1

# Load credentials
def load_env(path):
    env = {}
    with open(path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                env[k.strip()] = v.strip()
    return env

base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
local_env = load_env(os.path.join(base_dir, ".env"))
staging_env = load_env(os.path.join(base_dir, ".env.prod"))

LOCAL_AUTH = {
    "key_identity": local_env["OMEKA_KEY_IDENTITY"],
    "key_credential": local_env["OMEKA_KEY_CREDENTIAL"],
}
STAGING_AUTH = {
    "key_identity": staging_env["key_identity"],
    "key_credential": staging_env["key_credential"],
}


def api_get(api_url, endpoint):
    url = f"{api_url}/{endpoint}"
    with urllib.request.urlopen(url) as resp:
        return json.loads(resp.read())


def api_post_json(api_url, auth, endpoint, data):
    """POST JSON using curl to avoid WAF/firewall issues with urllib."""
    import subprocess
    url = f"{api_url}/{endpoint}?" + urllib.parse.urlencode(auth)
    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
        json.dump(data, f)
        tmp_path = f.name
    try:
        result = subprocess.run(
            ["curl", "-s", "-X", "POST", url, "-H", "Content-Type: application/json", "-d", f"@{tmp_path}"],
            capture_output=True, text=True,
        )
    finally:
        os.unlink(tmp_path)
    if not result.stdout.strip():
        raise RuntimeError(f"Empty response from {endpoint}: {result.stderr}")
    parsed = json.loads(result.stdout)
    if isinstance(parsed, dict) and "errors" in parsed:
        raise RuntimeError(f"API error from {endpoint}: {parsed['errors']}")
    return parsed


def api_patch_json(api_url, auth, endpoint, data):
    """PATCH JSON using curl."""
    import subprocess
    url = f"{api_url}/{endpoint}?" + urllib.parse.urlencode(auth)
    with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as f:
        json.dump(data, f)
        tmp_path = f.name
    try:
        result = subprocess.run(
            ["curl", "-s", "-X", "PATCH", url, "-H", "Content-Type: application/json", "-d", f"@{tmp_path}"],
            capture_output=True, text=True,
        )
    finally:
        os.unlink(tmp_path)
    if not result.stdout.strip():
        raise RuntimeError(f"Empty response from {endpoint}: {result.stderr}")
    return json.loads(result.stdout)


def upload_media(api_url, auth, item_id, file_path, media_type, title):
    """Upload a media file to an item via multipart form."""
    import subprocess
    url = f"{api_url}/media?key_identity={auth['key_identity']}&key_credential={auth['key_credential']}"
    data_json = json.dumps({
        "o:ingester": "upload",
        "file_index": 0,
        "o:item": {"o:id": item_id},
        "dcterms:title": [{"type": "literal", "property_id": 1, "@value": title}],
    })
    result = subprocess.run([
        "curl", "-s", "-X", "POST", url,
        "-F", f"data={data_json};type=application/json",
        "-F", f"file[0]=@{file_path};type={media_type}",
    ], capture_output=True, text=True)
    return json.loads(result.stdout)


def download_file(url, dest):
    urllib.request.urlretrieve(url, dest)


# ---------- Migrate ----------

print("=== Migrating to staging ===\n")

# 1. Migrate item sets
print("Migrating item sets...")
local_sets = api_get(LOCAL_API, "item_sets?per_page=100")
staging_sets = api_get(STAGING_API, "item_sets?per_page=100")
staging_set_titles = {s["o:title"]: s["o:id"] for s in staging_sets}
set_id_map = {}  # local ID -> staging ID

for ls in local_sets:
    title = ls.get("o:title", "untitled")

    # Skip if already exists on staging
    if title in staging_set_titles:
        set_id_map[ls["o:id"]] = staging_set_titles[title]
        print(f"  Already exists: {title} (staging ID: {staging_set_titles[title]})")
        continue

    # Extract property values from the local item set
    data = {}
    for key, values in ls.items():
        if key.startswith("dcterms:") or key.startswith("oralhistory:"):
            data[key] = values
    data["o:is_public"] = ls.get("o:is_public", True)

    resp = api_post_json(STAGING_API, STAGING_AUTH, "item_sets", data)
    set_id_map[ls["o:id"]] = resp["o:id"]
    print(f"  Created item set: {title} (local {ls['o:id']} -> staging {resp['o:id']})")

# Assign item sets to site
if set_id_map:
    try:
        site_item_sets = [{"o:item_set": {"o:id": sid}} for sid in set_id_map.values()]
        api_patch_json(STAGING_API, STAGING_AUTH, f"sites/{STAGING_SITE_ID}", {"o:site_item_set": site_item_sets})
        print(f"  Assigned {len(site_item_sets)} item sets to site\n")
    except Exception as e:
        print(f"  NOTE: Could not assign item sets to site via API ({e}). Do this in Admin > Sites > Resources.\n")

# 2. Migrate items
print("Migrating items...")
local_items = api_get(LOCAL_API, "items?per_page=100")

for li in local_items:
    title = li.get("o:title", "untitled")

    # Build item data, separating transcript (large) from other metadata
    data = {}
    transcript_data = {}
    for key, values in li.items():
        if key.startswith("dcterms:") or key.startswith("oralhistory:"):
            if key == "oralhistory:transcript":
                transcript_data[key] = values
            else:
                data[key] = values

    data["o:is_public"] = li.get("o:is_public", True)

    # Map item sets
    if li.get("o:item_set"):
        data["o:item_set"] = [{"o:id": set_id_map.get(s["o:id"], s["o:id"])} for s in li["o:item_set"]]

    # Set resource template
    if li.get("o:resource_template"):
        data["o:resource_template"] = {"o:id": 2}  # Oral History Interview on staging

    try:
        resp = api_post_json(STAGING_API, STAGING_AUTH, "items", data)
        new_item_id = resp["o:id"]
        print(f"  Created item: {title} (local {li['o:id']} -> staging {new_item_id})")
    except Exception as e:
        print(f"  FAILED item: {title} (local {li['o:id']}): {e}")
        continue

    # NOTE: Transcript is too large for the API (WAF limit). Copy/paste manually in admin.
    if transcript_data:
        print(f"    NOTE: Transcript skipped (copy/paste in admin)")

    # 3. Migrate media for this item
    local_media = api_get(LOCAL_API, f"media?item_id={li['o:id']}&per_page=50")
    for lm in local_media:
        media_type = lm.get("o:media_type", "")
        media_title = lm.get("o:title") or lm.get("o:source") or "Media"
        original_url = lm.get("o:original_url")

        if not original_url:
            print(f"    Skipping media {lm['o:id']}: no original URL")
            continue

        # Download to temp file
        ext = os.path.splitext(original_url)[-1] or ".bin"
        with tempfile.NamedTemporaryFile(suffix=ext, delete=False) as tmp:
            tmp_path = tmp.name

        try:
            download_file(original_url, tmp_path)
            result = upload_media(STAGING_API, STAGING_AUTH, new_item_id, tmp_path, media_type, media_title)
            print(f"    Uploaded media: {media_title} (staging ID: {result.get('o:id')})")
        except Exception as e:
            print(f"    FAILED media: {media_title}: {e}")
        finally:
            os.unlink(tmp_path)

print("\nDone!")
