import csv
import json
import requests

API_SERVER = "https://dhcr.clarin-dariah.eu/api/v1"
API_CALLS = [
    "/courses/index",
    "/countries/index",
    "/cities/index",
    "/institutions/index",
    "/course_duration_units/index",
    "/deletion_reasons/index",
    "/languages/index",
    "/course_types/index",
    "/course_parent_types/index",
    "/disciplines/index",
    "/tadirah_objects/index",
    "/tadirah_techniques/index"
]
OUTPUT_DIR = "../data/"


# Download the dumps following the API calls
for api_call in API_CALLS:
    r = requests.get(API_SERVER + api_call)
    with open(OUTPUT_DIR+api_call.replace("/index","").replace("/","")+".json", 'w') as outfile:
        json.dump(r.json(), outfile)
