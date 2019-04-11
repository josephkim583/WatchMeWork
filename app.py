from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return "This shit Watches you"

@app.route('/keywords', methods = ['GET'])
def get_keywords():
    data = request.data
    print(data)
    return "SUCCESS"

if __name__ == '__main__':
    app.run(debug = True)