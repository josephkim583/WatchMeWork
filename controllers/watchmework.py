import json
from models.watchmework import WatchMeWorkModel
import requests

class WatchMeWorkController():

    @classmethod
    def get_keyword(cls, text):
        try:
            response = get_msft_keywords(text)
            response = json.loads(response)
            keywords = response["documents"][0]["keyPhrases"]
            return (json.dumps(keywords))
        except: 
            return ("Internal System Error")



def get_msft_keywords(text):
        print (text)
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
            response = requests.post(URL, data = json.dumps(body), headers = header)

        except:
            return ("Internal system error")

        return (response.text) 