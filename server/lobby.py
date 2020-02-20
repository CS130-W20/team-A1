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
            "clients": [username],
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
    be expecting 'player_suc_join' if successful. Also emits 'game_ready' if all 4 players in.

    '''
    username = data['username']
    room = data['room']
    if room in game_rooms:
        if username not in game_rooms[room]["clients"]:
            num_players = len(game_rooms[room]['clients'])
            if num_players >= MAX_PLAYERS:
                emit("player_error_join", "Too many players")
            join_room(room)
            game_rooms[room]["clients"].append(username)
            print(game_rooms)
            emit("player_suc_join", game_rooms[room], room=room)
            #Start and initialize game. Note that we assuming game starts once
            #all four players in lobby. 
            if num_players == MAX_PLAYERS:
                game_rooms[room]['game'] = GameManager(game_rooms[room]['host'], game_rooms[room]['clients'])
                emit("game_ready", game_rooms[room], room=room)        
    else:
        emit("player_error_join", "Room does not exist")
   

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

@socketio.on('submit_prompt')
def on_prompt(data):
    """ 
    This is the event the server listens to for getting the prompt from the prompter. It sends
    the prompt to the game_manager, who gets the results and returns 3 shuffled versions to
    display to the non-host clients.
    @param data - Dict with a query field, containing string for query (i.e. 'how to'), and room field, containing string with name of room.
    @return - emits the player key answer value dict of scrambled orders back to the client.
    """

    room = data['room']
    query = data['query']
    game = game_rooms[room]['game']
    suggestions = game.get_suggestions(query)
    emit('display_suggestions', suggestions, room=room)

@socketio.on('submit_answer')
def on_submit(data):
    """
    This is the event the server listens to for getting an answer from one of the players. It sends the
    answer to the game manager, who adds the answers to its list. It then checks if all answers
    have been submitted, and if so, asks the game for the full score.
    @param data - Dict with a room field, with a string of room name, and an answer field, a dict with a key of the username and value of their answer order.
    @return - Emits a waiting message if this is not the final answer, or emits the a dict with a key for each username containing each person's scores.
    """

    room = data['room']
    answer = data['answer']
    game = data[room]['game']
    game.add_new_answer(answer)


    #Check if this entry caused the answers to all be submitted.
    scores = game.get_current_answers()
    if len(scores) == MAX_RESPONDERS:
        emit('send_scores', game.get_all_scores(scores), room=room)

@socketio.on('new_round')
def on_new_round(data):
    """
    This is the event the server listens to for starting a new round, once client informs it that it has properly displayed the data.
    It updates the internals of the game state and then messages the front end the new prompter and responders, so that it can
    display the right page to them.
    @param data - Dict with a 'room' key specifying room name string.
    @return - Emits a message with the new prompter string and new responders list of strings, as a dict with keywords 'prompter' and 'respondents',
            - if game still going. If game just ended, then emits game over with a dict of player name to score to all players in that lobby.
    """
    room = data['room']
    game = data[room]['game']
    game_rooms[room]['game'].update_round()

    if game.get_game_status():
        player_info = {'prompter': game.get_prompter(), 'respondents': game.get_respondents()}
        emit('round_player_info', player_info, room=room)
    else:
        emit('game_over', game.get_total_scores(), room=room)
        game_rooms[room]['game'] = None
    
    
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