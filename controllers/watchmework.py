import json

class WatchMeWorkController():

    @classmethod
    def get_keyword(cls, text):
        try:
            return (text)
        except: 
            return ("Internal System Error")