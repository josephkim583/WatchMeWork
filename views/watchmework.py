from flask import request
from flask.views import MethodView
from controllers.watchmework import WatchMeWorkController
import json


class WatchMeWorkView(MethodView):
    
    @classmethod
    def get_keywords(cls):
        data = request.form
        response = WatchMeWorkController.get_keyword(data['data'])
        return (response)

