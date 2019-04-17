from flask import request
from flask.views import MethodView
from controllers.search import SearchController
import json

class SearchView(MethodView):
    @classmethod
    def get_google_custom_search(cls):
        data = request.form
        
        error_message, status, response = SearchController.get_google_custom_search(data['data'])

        if error_message:
            return json.dumps({"error_message": error_message}), status

        return json.dumps({"response": response}), status