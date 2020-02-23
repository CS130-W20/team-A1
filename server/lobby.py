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
import GameManager

MAX_PLAYERS = 4
player_names = ["kitten warrior", "kitten farmer", "kittens123", "kitten", "I like cats", "Catman123", "boxed kittens"]

lobby_names = ["Dwarf", "Bree", "Dale", "Drúedain", "Dunlendings", "Easterling", "Haradrim", "Hobbit", "Maiar", "Orc", "Quenya", "Rohirrim", "Sindarin"]
game_rooms = {}
app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app, cors_allowed_origins='*')

@socketio.on('my event')
def handle_my_custom_event(json):
    print('received json: ' + str(json))

#Need to add that each person can only be host
#for one room.


@socketio.on('create_room')
def on_create(data):
    '''
    This is the event the server is listening to for creating game rooms.
    The lobby manager will generate a random lobby name for the player
    requesting the creation. 
    The lobby manager will save the instance of the lobby in the game_rooms data structure
    @param data - a dict. containing the username of the player requesting the creation
    @return - emits an event back to the front-end client, the front-end client should
    be expecting 'lobby_created' with the details of the lobby sent through the socket
    '''
    username = data['username']
    lobby_num = random.randint(50,8000)
    lobby = "{0}{1}".format(random.choice(lobby_names), lobby_num)
    if lobby not in game_rooms:
        game_rooms[lobby] = {
            "room_name": lobby,
            "host": username,
            "clients": [],
            "status": {},
            "game": None
        }
        join_room(lobby)
        print(game_rooms)
        print(rooms())
        emit('lobby_created', game_rooms[lobby], room=lobby)

#for one room.
@socketio.on('join_room')
def on_join(data):
    '''
    This is the event the server is listening to for joining game rooms.
    The lobby manager will attempt to join the game room if it exists and is not full
    The lobby manager will update the instance of the lobby object in memory
    @param data - a dict containing the username and lobby of the player requesting the deletion
    @return - emits an event back to the front-end client, the front-end client should
    be expecting 'player_suc_join' if successful

    '''
    username = data['username']
    room = data['room']
    if room in game_rooms:
        if username not in game_rooms[room]["clients"]:
            num_players = len(game_rooms[room]['clients'])
            if num_players >= MAX_PLAYERS:
                emit("player_error_join", "Too many players", room=room)
            else:
                join_room(room)
                game_rooms[room]["clients"].append(username)
                game_rooms[room]['status'].update({username: 'Not Ready'})
                print(game_rooms)
                #msg={"status":'Not Ready',"room_name":room,'clients':[{},{},{}]}
                emit("player_suc_join", game_rooms[room], room=room)
                emit("new_player_join", {"id": username, "name": random.choice(player_names), "status": game_rooms[room]['status'][username]},room=room)
    else:
        emit("player_error_join", "Room does not exist")


@socketio.on("player_ready")
def on_playerReady(data):
    username = data['id']
    room = data['room_name']
    game_rooms[room]['status'][username] = 'Ready'
    emit("player_status_changed", {'id':username, 'room_name':room,'status':"Ready"}, room=room)
    #This function needs to tell everyone in the same room with the player, 
    # who just sent message saying he's ready, about this player's status change
    #for everyplayer in the same room :
    if all(value == 'ready' for value in game_rooms[room]['status']):
        game_rooms[room]['game'] = GameManager(game_rooms[room]['host'], game_rooms[room]['clients'])
        emit("game_ready", room=room)
    #Note: *****If All the players in that room is ready , send a "you can start" the game message to the room owner!!
    #Like: emit("you_may_start")
    #To the player+owner send a json containing all the info about the player who sent this message , in addition, send the owner a string message saying "Clear"
    
@socketio.on("player_UNDOready")
def on_playerUnready(data):
    room = data['room_name']
    username = data['id']
    game_rooms[room]['status'][username] = 'Not Ready'
    emit("player_status_changed", {'id':username, 'room_name':room,'status':"Not-Ready"}, room=room)
    emit("game_not_ready",room=room)


@socketio.on("player_left_room")
def on_playerLeft(data):
    id = data['id']
    room = data['room_name']
    emit("player_left", {"player_id":id}, room=room)


@socketio.on("start_game")
def on_gameStarted(data):
    room = data['room_name']
    emit("enter_game", "go", room=room)
    #send all the users in the room(including the owner) a message containing{}


@socketio.on('destroy_room')
def on_destroy(data):
    '''
    This is the event the server is listening to for destroying game rooms.
    The lobby manager will attempt to destory the lobby instance if the player requesting is the host
    @param data - a dict containing the username and lobby of the player requesting the join
    @return - emits an event back to the front-end client, the front-end client should
    be expecting 'lobby_destroyed' if successful

    '''
    print(data)
    username = data['username']
    room = data['room']
    #Need so that we only delete a room if one exists.
    found = False
    #This loop should be replaced by using the socket
    #to get the actual lobby name from the client and just indexing
    #with that. Putting loop in to test deletion of dummy
    #room that has been created. Note that this loop, while it
    #will be removed, assumes there is only one room for each host.
    for key in game_rooms:
        if game_rooms[key]['host'] == username:
            room = key
            emit('lobby_destroyed', game_rooms[room], room=game_rooms[room]['room_name'])
            leave_room(game_rooms[room]['room_name'])
            print(game_rooms)
            print(rooms())
            found = True
            break
    

    #Remove the game from the list if it exits.
    if found:
        del game_rooms[room]
        

    
@app.route("/")
def index():
    return render_template('index.html',token="Hello This is Salek")

@app.route('/query/', methods=['GET'])
def get_query():
    """
    Proxy endpoint used to ping hosted internal QueryAPI server
    Takes in request argument through the url.
    """
    if 'query' in request.args:
        query = str(request.args['query'])
    else:
        return "Error must add query param to request"
    # Submit request for query to AWS or Local API
    payload={'query':query}
    # answers = requests.get('http://3.85.238.64/query/', params=payload)
    answers = requests.get('http://127.0.0.1:8000/query/', params=payload)
    print('answers received: ', answers.json())
    return jsonify(answers.json())




if __name__ == '__main__':
    socketio.run(app,debug=True)