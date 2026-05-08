#!/usr/bin/env python3
"""Seed Omeka S with sample oral history data from the prototype.

Usage:
    python3 seed.py KEY_IDENTITY KEY_CREDENTIAL

Create an API key in Omeka admin: User > API Keys > New key.
"""

import json
import os
import sys
import urllib.request
import urllib.parse

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


def api_get(endpoint):
    url = f"{API}/{endpoint}"
    with urllib.request.urlopen(url) as resp:
        return json.loads(resp.read())


# ---------- Data ----------

collections = [
    {"key": "patriots", "title": "Patriots\u2019 Day & the Battle Road", "desc": "Recollections of the Battles of Lexington and Concord, the Jason Russell House skirmish, and how Arlington commemorates them.", "years": "1775\u2013present"},
    {"key": "menotomy", "title": "Menotomy Voices", "desc": "Long-time residents reflect on growing up in Arlington \u2014 neighborhoods, schools, the Mystic Lakes, the bus to Boston.", "years": "1920s\u20131990s"},
    {"key": "mainstreet", "title": "Mass Ave Main Street", "desc": "Shopkeepers, diner cooks, and pharmacists describe the changing face of Massachusetts Avenue.", "years": "1940s\u20132010s"},
    {"key": "immigrant", "title": "Coming to Arlington", "desc": "Italian, Irish, Armenian, Greek, and Chinese-American families describe arrival, work, and community.", "years": "1900s\u20132020s"},
    {"key": "civic", "title": "Town Meeting & Civic Life", "desc": "Selectmen, librarians, school committee members, and volunteers on Arlington governance.", "years": "1960s\u20132020s"},
    {"key": "mills", "title": "The Mills on the Mystic", "desc": "Industry along Mill Brook \u2014 from Schwamb\u2019s mirrors to the ice houses of Spy Pond.", "years": "1850s\u20131950s"},
]

interviews = [
    {"name": "Eleanor Russell", "years": "1918\u20132014", "recorded": "June 14, 2008", "length": "1:42:18", "collection": "patriots", "neighborhood": "Arlington Center", "interviewer": "Margaret Chen", "topics": ["Jason Russell House", "Patriots\u2019 Day", "Genealogy"], "summary": "A descendant of Jason Russell recounts family stories passed down about April 19, 1775, and her decades caring for the Russell House as a docent."},
    {"name": "Anthony Caruso", "years": "b. 1936", "recorded": "March 3, 2019", "length": "2:11:04", "collection": "mainstreet", "neighborhood": "East Arlington", "interviewer": "Sarah Whitford", "topics": ["Mass Ave", "Italian-American", "Bakery"], "summary": "Owner of Caruso\u2019s Bakery on Mass Ave from 1962 to 2004 describes apprenticing with his father and watching the avenue change."},
    {"name": "Grace Okonjo", "years": "b. 1954", "recorded": "October 22, 2021", "length": "1:18:47", "collection": "civic", "neighborhood": "Arlington Heights", "interviewer": "David Park", "topics": ["Town Meeting", "School Committee", "Civil Rights"], "summary": "The first African-American woman elected to Arlington Town Meeting reflects on civic life from the 1980s onward."},
    {"name": "Patrick Donovan", "years": "1929\u20132020", "recorded": "August 9, 2011", "length": "2:48:33", "collection": "menotomy", "neighborhood": "East Arlington", "interviewer": "Margaret Chen", "topics": ["Spy Pond", "Ice harvesting", "Childhood"], "summary": "Recollections of the last commercial ice cuttings on Spy Pond and growing up by the Mystic Lakes."},
    {"name": "Vartan Aramian", "years": "b. 1947", "recorded": "May 2, 2017", "length": "1:55:09", "collection": "immigrant", "neighborhood": "Brattle Street", "interviewer": "Lila Hovsepian", "topics": ["Armenian community", "Watertown", "Rugs"], "summary": "Arrival from Beirut in 1972 and the Armenian community connecting Watertown and Arlington."},
    {"name": "Ruth Schwamb", "years": "1924\u20132018", "recorded": "July 19, 2010", "length": "1:12:55", "collection": "mills", "neighborhood": "Arlington Heights", "interviewer": "Margaret Chen", "topics": ["Schwamb Mill", "Industry", "Mill Brook"], "summary": "A Schwamb family member describes the picture-frame mill\u2019s last working days and the decision to make it a museum."},
    {"name": "Helen Lee", "years": "b. 1962", "recorded": "February 11, 2023", "length": "1:34:21", "collection": "immigrant", "neighborhood": "Arlington Center", "interviewer": "David Park", "topics": ["Chinese-American", "Restaurants", "School"], "summary": "A second-generation Chinese-American restaurateur on family, food, and Arlington High School."},
    {"name": "James McGrath", "years": "b. 1941", "recorded": "November 4, 2015", "length": "2:02:11", "collection": "menotomy", "neighborhood": "Arlington Heights", "interviewer": "Sarah Whitford", "topics": ["Buses", "Boston", "Mystic Lakes"], "summary": "A retired MBTA driver remembers the 77 bus route and weekends at the Mystic Lakes."},
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
        "o:is_public": True,
    }
    # Add spatial if the property exists
    spatial_id = prop_id("dcterms:spatial")
    if spatial_id:
        data["dcterms:spatial"] = [{"type": "literal", "property_id": spatial_id, "@value": i["neighborhood"]}]

    resp = api_post("items", data)
    print(f"  Created item: {i['name']} (ID: {resp['o:id']})")


print(f"\nDone! Created {len(collections)} item sets and {len(interviews)} items.")
print("Visit http://localhost:8080/admin to verify, then browse the public site.")
