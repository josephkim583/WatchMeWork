from flask import Flask, jsonify, request
from views.keyword import KeyWordView
from views.search import SearchView

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "This shit Watches you"

@app.route('/keywords', methods = ['GET'])
def get_keywords():
    return KeyWordView.get_keywords()

@app.route('/entities', methods = ['GET'])
def get_entities():
    return KeyWordView.get_entities()

@app.route('/google_custon_search', methods = ['GET'])
def get_google_custom_search():
    return SearchView.get_google_custom_search()



if __name__ == '__main__':
    app.run(debug = True)