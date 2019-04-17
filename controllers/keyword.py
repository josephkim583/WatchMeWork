import json
import requests

class KeyWordController():

    @classmethod
    def get_keyword(cls, text):
        try:
            response = get_msft_keywords(text)
            response = json.loads(response)
            keywords = response["documents"][0]["keyPhrases"]
            return ("", 200, json.dumps(keywords))
        except: 
            return ("Internal System Error"),  500, None


    @classmethod
    def get_entities(cls, text):
        try:
            response = get_msft_entities(text)
            response = json.loads(response)
            entities = response["documents"][0]["entities"]
            print (entities)
            return ("", 200, json.dumps(entities))
        except:
            return ("Internal System Error"), 500, None


def get_msft_keywords(text):
    
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

def get_msft_entities(text):
    try:
        URL = 'https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/entities'
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