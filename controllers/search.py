import json
import requests

class SearchController():
    @classmethod
    def get_google_custom_search(cls, query):
        try:
            response = google_custom_search(query)
            response = json.loads(response)
            return "", 200, json.dumps(response)
        except:
            return "Internal System Error", 500, None
        


def google_custom_search(query):
    URL = "https://www.googleapis.com/customsearch/v1?key=%KEY%&cx=%CX%&q=%Q%"
    ApiKey = "AIzaSyDAErFBFTUP4PhEJpGhJlUTrhBDXSoCh9U"
    searchEngineID = "016946273156636846852:8aa7ymixbca"

    URL = URL.replace("%KEY%", ApiKey)
    URL = URL.replace("%CX%", searchEngineID)
    URL = URL.replace("%Q%", query)

    print (URL)
    response = requests.get(URL)

    return response.text