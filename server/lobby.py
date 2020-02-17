import os

from flask import request, jsonify

from flask import Flask, render_template, url_for
from flask_socketio import SocketIO, emit, join_room, leave_room
from collections import defaultdict
import requests

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template('index.html',token="Hello This is Salek")

@app.route('/query/', methods=['GET'])
def get_query():
    if 'query' in request.args:
        query = str(request.args['query'])
    else:
        return "Error must add query param to request"
    # Submit request for query to AWS or Local API
    payload={'query':query}
    answers = requests.get('http://18.206.137.249/query/', params=payload)
    print('answers received: ', answers.json())
    return jsonify(answers.json())



if __name__ == '__main__':
	socketio.run(app)
	
	
	