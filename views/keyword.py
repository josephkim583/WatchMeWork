from flask import request
from flask.views import MethodView
from controllers.keyword import KeyWordController
import json


class KeyWordView(MethodView):
    
    @classmethod
    def get_keywords(cls):
        data = request.form

        error_message, status, response = KeyWordController.get_keyword(data['data'])
        
        if error_message:
                return json.dumps({"error_message": error_message}), status
        return json.dumps({"response": response}), status 
        
    @classmethod
    def get_entities(cls):
        data = request.form

        error_message, status, response = KeyWordController.get_entities(data['data'])

        if error_message:
            return json.dumps({"error_message": error_message}), status
        return json.dumps({"response": response}), status
        
