import os

from flask import request, jsonify
from flask import session
from flask_socketio import rooms
from flask import Flask, render_template, url_for
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_socketio import send, emit
from collections import defaultdict
import random

import requests

lobby_names = ["Dwarf", "Bree", "Dale", "Drúedain", "Dunlendings", "Easterling", "Haradrim", "Hobbit", "Maiar", "Orc", "Quenya", "Rohirrim", "Sindarin"]
game_rooms = {}
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app, cors_allowed_origins='*')

@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))


@socketio.on('create_room')
def on_join(data):
    print(data)
    username = data['username']
    room = data['room']

    lobby_num = random.randint(50,8000)
    lobby = "{0}{1}".format(random.choice(lobby_names), lobby_num)
    if lobby not in game_rooms:
        game_rooms[lobby] = {
            "room_name": lobby,
            "host": username,
            "prompter": username,
            "clients": [username],
            "round_num": 0
        }
        join_room(lobby)
        print(game_rooms)
        print(rooms())
        emit('lobby_created', game_rooms[lobby], room=lobby)
    

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
	socketio.run(app,debug=True)
	
	
