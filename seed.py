#!/usr/bin/env python3
"""Seed Omeka S with sample oral history data and resource templates.

Usage:
    python3 seed.py                  # seed everything (template + data)
    python3 seed.py --template-only  # only create the resource template

API keys are read from .env or passed as arguments:
    python3 seed.py KEY_IDENTITY KEY_CREDENTIAL
"""

import json
import os
import sys
import urllib.request
import urllib.parse

TEMPLATE_ONLY = "--template-only" in sys.argv
if TEMPLATE_ONLY:
    sys.argv.remove("--template-only")

API = "http://localhost:8080/api"

# Read from .env file if it exists
env_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env")
if os.path.exists(env_path):
    with open(env_path) as f:
        for line in f:
            line = line.strip()
            if line and not line.startswith("#") and "=" in line:
                k, v = line.split("=", 1)
                os.environ.setdefault(k.strip(), v.strip())

if len(sys.argv) == 3:
    IDENTITY = sys.argv[1]
    CREDENTIAL = sys.argv[2]
else:
    IDENTITY = os.environ.get("OMEKA_KEY_IDENTITY")
    CREDENTIAL = os.environ.get("OMEKA_KEY_CREDENTIAL")

if not IDENTITY or not CREDENTIAL:
    print("Usage: python3 seed.py [KEY_IDENTITY KEY_CREDENTIAL]")
    print("Or set OMEKA_KEY_IDENTITY and OMEKA_KEY_CREDENTIAL in .env")
    sys.exit(1)
AUTH = {"key_identity": IDENTITY, "key_credential": CREDENTIAL}


def api_post(endpoint, data):
    url = f"{API}/{endpoint}?" + urllib.parse.urlencode(AUTH)
    body = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def api_patch(endpoint, data):
    url = f"{API}/{endpoint}?" + urllib.parse.urlencode(AUTH)
    body = json.dumps(data).encode("utf-8")
    req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"}, method="PATCH")
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


def api_get(endpoint):
    url = f"{API}/{endpoint}"
    with urllib.request.urlopen(url) as resp:
        return json.loads(resp.read())


# ---------- Data ----------

collections = [
    {"key": "civilwar", "title": "The Civil War & Freedman\u2019s Village", "desc": "Stories of Freedman\u2019s Village, the contraband camps, and Arlington\u2019s role in the Civil War and its aftermath.", "years": "1861\u2013present"},
    {"key": "neighborhoods", "title": "Arlington Neighborhoods", "desc": "Long-time residents reflect on growing up in Arlington \u2014 Clarendon, Ballston, Cherrydale, and beyond.", "years": "1920s\u20131990s"},
    {"key": "columbia_pike", "title": "Columbia Pike Stories", "desc": "Shopkeepers, restaurateurs, and residents describe the changing face of Columbia Pike.", "years": "1940s\u20132010s"},
    {"key": "immigrant", "title": "Coming to Arlington", "desc": "Bolivian, Vietnamese, Ethiopian, and Salvadoran families describe arrival, work, and community.", "years": "1960s\u20132020s"},
    {"key": "civic", "title": "County Board & Civic Life", "desc": "Board members, librarians, school officials, and volunteers on Arlington governance.", "years": "1960s\u20132020s"},
    {"key": "pentagon", "title": "In the Shadow of the Pentagon", "desc": "Life near the Pentagon \u2014 from its construction through September 11 and the years after.", "years": "1940s\u20132020s"},
]

interviews = [
    {"name": "Dorothy Henderson", "years": "1920\u20132015", "recorded": "June 14, 2008", "length": "1:42:18", "collection": "civilwar", "neighborhood": "South Arlington", "interviewer": "Margaret Chen", "topics": ["Freedman\u2019s Village", "Arlington Cemetery", "Genealogy"], "summary": "A descendant of Freedman\u2019s Village residents traces her family\u2019s story from the Civil War contraband camps to modern-day Arlington."},
    {"name": "Marco Escobar", "years": "b. 1958", "recorded": "March 3, 2019", "length": "2:11:04", "collection": "columbia_pike", "neighborhood": "Columbia Pike", "interviewer": "Sarah Whitford", "topics": ["Columbia Pike", "Salvadoran-American", "Restaurant"], "summary": "Owner of a pupuseria on Columbia Pike since 1989 describes building a Salvadoran community hub along the corridor."},
    {"name": "Grace Okonjo", "years": "b. 1954", "recorded": "October 22, 2021", "length": "1:18:47", "collection": "civic", "neighborhood": "Clarendon", "interviewer": "David Park", "topics": ["County Board", "School Board", "Civil Rights"], "summary": "A longtime Arlington County Board member reflects on civic life and the fight for equitable development."},
    {"name": "Robert Tran", "years": "b. 1965", "recorded": "August 9, 2011", "length": "2:48:33", "collection": "neighborhoods", "neighborhood": "Ballston", "interviewer": "Margaret Chen", "topics": ["Ballston", "Development", "Childhood"], "summary": "Memories of Ballston before the Metro arrived and watching the neighborhood transform from suburban to urban."},
    {"name": "Fatima Yohannes", "years": "b. 1972", "recorded": "May 2, 2017", "length": "1:55:09", "collection": "immigrant", "neighborhood": "Buckingham", "interviewer": "Lila Hovsepian", "topics": ["Ethiopian community", "Restaurants", "Culture"], "summary": "Arrival from Addis Ababa in 1995 and building the Ethiopian restaurant and cultural scene along Columbia Pike."},
    {"name": "Thomas Kelley", "years": "1935\u20132019", "recorded": "July 19, 2010", "length": "1:12:55", "collection": "pentagon", "neighborhood": "Pentagon City", "interviewer": "Margaret Chen", "topics": ["Pentagon", "September 11", "Military"], "summary": "A retired Pentagon employee describes working there for thirty years, including the morning of September 11, 2001."},
    {"name": "Linh Nguyen", "years": "b. 1962", "recorded": "February 11, 2023", "length": "1:34:21", "collection": "immigrant", "neighborhood": "Cherrydale", "interviewer": "David Park", "topics": ["Vietnamese-American", "Restaurants", "School"], "summary": "A second-generation Vietnamese-American restaurateur on family, pho, and growing up in Arlington in the 1970s."},
    {"name": "James Patterson", "years": "b. 1941", "recorded": "November 4, 2015", "length": "2:02:11", "collection": "neighborhoods", "neighborhood": "Lyon Village", "interviewer": "Sarah Whitford", "topics": ["Metro", "Rosslyn", "Clarendon"], "summary": "A retired Metro planner remembers the Orange Line\u2019s arrival and how it reshaped the Rosslyn-Ballston corridor."},
]


# ---------- Discover property IDs ----------

print("Looking up property IDs...")
props = api_get("properties?per_page=100")
prop_map = {}
for p in props:
    term = p.get("o:term", "")
    prop_map[term] = p["o:id"]

def prop_id(term):
    pid = prop_map.get(term)
    if not pid:
        print(f"  WARNING: property '{term}' not found, skipping")
    return pid


# ---------- Create Resource Template ----------

print("\nCreating resource template...")
template_data = {
    "o:label": "Oral History Interview",
    "o:resource_template_property": [
        {"o:property": {"o:id": prop_id("dcterms:title")}, "o:alternate_label": "Interviewee Name", "o:alternate_comment": "Full name of the person interviewed", "o:is_required": True, "o:data_type": []},
        {"o:property": {"o:id": prop_id("dcterms:description")}, "o:alternate_label": "Summary", "o:alternate_comment": "Brief description of the interview content", "o:is_required": True, "o:data_type": []},
        {"o:property": {"o:id": prop_id("dcterms:date")}, "o:alternate_label": "Life Dates", "o:alternate_comment": "Birth and death years of the interviewee (e.g. 1920\u20132015 or b. 1958)", "o:is_required": False, "o:data_type": []},
        {"o:property": {"o:id": prop_id("dcterms:created")}, "o:alternate_label": "Date Recorded", "o:alternate_comment": "Date the interview was recorded", "o:is_required": True, "o:data_type": []},
        {"o:property": {"o:id": prop_id("dcterms:subject")}, "o:alternate_label": "Topics", "o:alternate_comment": "Subject keywords (add multiple values)", "o:is_required": False, "o:data_type": []},
        {"o:property": {"o:id": prop_id("dcterms:contributor")}, "o:alternate_label": "Interviewer", "o:alternate_comment": "Name of the interviewer (e.g. Interviewed by Margaret Chen)", "o:is_required": False, "o:data_type": []},
        {"o:property": {"o:id": prop_id("dcterms:extent")}, "o:alternate_label": "Duration", "o:alternate_comment": "Length of the interview recording (e.g. 1:42:18)", "o:is_required": False, "o:data_type": []},
        {"o:property": {"o:id": prop_id("dcterms:spatial")}, "o:alternate_label": "Neighborhood", "o:alternate_comment": "Arlington neighborhood associated with the interviewee", "o:is_required": False, "o:data_type": []},
    ],
}
template_resp = api_post("resource_templates", template_data)
template_id = template_resp["o:id"]
print(f"  Created resource template: Oral History Interview (ID: {template_id})")

if TEMPLATE_ONLY:
    print("\nDone! Template created. Use without --template-only to also seed sample data.")
    sys.exit(0)


# ---------- Create Item Sets ----------

print("\nCreating item sets...")
set_ids = {}

for c in collections:
    data = {
        "dcterms:title": [{"type": "literal", "property_id": prop_id("dcterms:title"), "@value": c["title"]}],
        "dcterms:description": [{"type": "literal", "property_id": prop_id("dcterms:description"), "@value": c["desc"]}],
        "dcterms:date": [{"type": "literal", "property_id": prop_id("dcterms:date"), "@value": c["years"]}],
        "o:is_public": True,
    }
    resp = api_post("item_sets", data)
    set_ids[c["key"]] = resp["o:id"]
    print(f"  Created item set: {c['title']} (ID: {resp['o:id']})")


# ---------- Create Items ----------

print("\nCreating items...")

for i in interviews:
    subjects = [{"type": "literal", "property_id": prop_id("dcterms:subject"), "@value": t} for t in i["topics"]]
    data = {
        "dcterms:title": [{"type": "literal", "property_id": prop_id("dcterms:title"), "@value": i["name"]}],
        "dcterms:description": [{"type": "literal", "property_id": prop_id("dcterms:description"), "@value": i["summary"]}],
        "dcterms:date": [{"type": "literal", "property_id": prop_id("dcterms:date"), "@value": i["years"]}],
        "dcterms:created": [{"type": "literal", "property_id": prop_id("dcterms:created"), "@value": i["recorded"]}],
        "dcterms:subject": subjects,
        "dcterms:contributor": [{"type": "literal", "property_id": prop_id("dcterms:contributor"), "@value": f"Interviewed by {i['interviewer']}"}],
        "dcterms:extent": [{"type": "literal", "property_id": prop_id("dcterms:extent"), "@value": i["length"]}],
        "o:item_set": [{"o:id": set_ids[i["collection"]]}],
        "o:resource_template": {"o:id": template_id},
        "o:is_public": True,
    }
    # Add spatial if the property exists
    spatial_id = prop_id("dcterms:spatial")
    if spatial_id:
        data["dcterms:spatial"] = [{"type": "literal", "property_id": spatial_id, "@value": i["neighborhood"]}]

    # Add a placeholder thumbnail via picsum
    seed_name = i["name"].lower().replace(" ", "-")
    data["o:media"] = [{
        "o:ingester": "url",
        "o:source": f"https://picsum.photos/seed/{seed_name}/800/600",
        "ingest_url": f"https://picsum.photos/seed/{seed_name}/800/600",
        "dcterms:title": [{"type": "literal", "property_id": prop_id("dcterms:title"), "@value": f"Portrait of {i['name']}"}],
    }]

    resp = api_post("items", data)
    print(f"  Created item: {i['name']} (ID: {resp['o:id']})")


# ---------- Assign Item Sets to Site ----------

SITE_ID = 1
print("\nAssigning item sets to site...")
site_item_sets = [{"o:item_set": {"o:id": sid}} for sid in set_ids.values()]
api_patch(f"sites/{SITE_ID}", {"o:site_item_set": site_item_sets})
print(f"  Assigned {len(site_item_sets)} item sets to site {SITE_ID}")

print(f"\nDone! Created {len(collections)} item sets and {len(interviews)} items.")
print("Visit http://localhost:8080/admin to verify, then browse the public site.")
