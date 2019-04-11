import json
from models.watchmework import WatchMeWorkModel

class WatchMeWorkController():

    @classmethod
    def get_keyword(cls, text):
        try:
            response = WatchMeWorkModel.get_msft_keywords(text)
            response = json.loads(response)
            keywords = response["documents"][0]["keyPhrases"]
            return (json.dumps(keywords))
        except: 
            return ("Internal System Error")