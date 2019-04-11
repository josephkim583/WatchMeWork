import requests
import json
import http.client, urllib.request, urllib.parse, urllib.error, base64

class WatchMeWorkModel():

    @classmethod
    def get_msft_keywords(cls, text):
        try:
            URL = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/keyPhrases'
            header = {
                        'Content-Type' : 'application/json',
                        'Ocp-Apim-Subscription-Key' : '8d74845554de45fd94d98d74e581b35b'
                    }

            body = {
                "documents": [
                    {
                    "language": "en",
                    "id": "1",
                    "text": text
                    },
                ]
            }
            response = requests.post(URL, json.dumps(body), headers = header) 

        except:
            return ("Internal system error")

        return (response.text) 