from flask import Flask, jsonify, request
from views.watchmework import WatchMeWorkView

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "This shit Watches you"

@app.route('/keywords', methods = ['GET'])
def get_keywords():
    return WatchMeWorkView.get_keywords()

if __name__ == '__main__':
    app.run(debug = True)