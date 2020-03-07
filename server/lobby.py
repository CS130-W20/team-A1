import os

from flask import request, jsonify
from flask import session
from flask_socketio import rooms
from flask import Flask, render_template, url_for
from flask_socketio import SocketIO, emit, join_room, leave_room
from flask_socketio import send, emit
from collections import defaultdict
import random
from urllib.error import HTTPError, URLError

import requests
import GameManager

MAX_PLAYERS = 4
#If you are getting problems with this its also in GameManager.py
MAX_RESPONDERS = 3
MAX_ROUNDS = 4
player_names = ["kitten warrior", "kitten farmer", "best kitten", "kitten", "I like cats", "Catman", "boxed kittens"]

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
    id = data['id']
    lobby_num = random.randint(50,8000)
    lobby = "{0}{1}".format(random.choice(lobby_names), lobby_num)
    player_name = data['name']
    if lobby not in game_rooms:
        game_rooms[lobby] = {
            "room_name": lobby,
            "host": id,
            "clients": [id],
            "status": {id: 'Not-Ready'},
            "names": {id: player_name},
            "game": None
        }

        #I put the _ to avoid possible name conflicts in the global name space
        #Missing: plz replace these values with actual values from the db
        #name_ ="jack"
        #room_ =lobby
        #status_ ='Ready'
       
        #Ignore this. Leaving it in on the off chance my format
        #doesn't work. But message should auto format the dictionary
        #structures correctly.
       # Message={
            #"users":[{
           #     'id':id,
          #      'name':name_,
         #       'room':room_,
        #        'status':status_
       #     }]
      #  }
        
        #This section actually generates message.
        users = [{'id':id, 'name':game_rooms[lobby]['names'][id], 'room':lobby, 'status':'Not-Ready'}]
        Message={"users":users}
        print(users)
        
        join_room(lobby)
        print(game_rooms)
        print(rooms())
        print('lobby creation message is being sent:',Message)
        emit('lobby_created', Message, room=lobby)

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
    id = data['id']
    player_name = data['name']
    room = data['room']
    if room in game_rooms:
        if id not in game_rooms[room]["clients"]:
            num_players = len(game_rooms[room]['clients'])
            if num_players >= MAX_PLAYERS:
                emit("player_error_join", "Too many players", room=room)
            else:
                join_room(room)
                game_rooms[room]["clients"].append(id)
                game_rooms[room]['status'].update({id: 'Not-Ready'})
                game_rooms[room]['names'].update({id: player_name})
                print(game_rooms)
                #We have to build a list of users in the room to return to the new joiner
                users=[]
                for i in game_rooms[room]["clients"]: 
                     users.append({'id':i, 'name':game_rooms[room]['names'][i], 'room':room, 'status':game_rooms[room]['status'][i]})
                Message={'users':users, 'owner_id':game_rooms[room]['host']}
                #Note: this is for the user who is joining the room 
                emit("player_suc_join", Message, room=room)
                #Note: this message is meant for other users already  in the room
                emit("new_player_join", {"id":id, "name":player_name, "status":game_rooms[room]['status'][id]}, room=room)
                print(users)
    else:
        emit("player_error_join", "Room does not exist")


@socketio.on("player_ready")
def on_playerReady(data):
    id = data['id']
    room = data['room']
    game_rooms[room]['status'][id] = 'Ready'
    emit("player_status_changed", {'id':id, 'status':"Ready"}, room=room)
    #This function needs to tell everyone in the same room with the player, 
    # who just sent message saying he's ready, about this player's status change
    #for everyplayer in the same room :
    ############Modified by Salekh #################################################################################### Added the second condition to check for there are 4 ppl in the room 
    if all(value == 'Ready' for value in game_rooms[room]['status'].values()) and len(game_rooms[room]['status'])==4:
    ########################################################################################################################################################################
        emit("if_all_ready", "Yes", room=room)
    
@socketio.on("player_UNDOready")
def on_playerUnready(data):
    room = data['room']
    id = data['id']
    unreadied = False
    if all(value == 'Ready' for value in game_rooms[room]['status'].values()):
        unreadied = True
    game_rooms[room]['status'][id] = 'Not-Ready'
    emit("player_status_changed", {'id':id, 'status':"Not-Ready"}, room=room)
    if unreadied:
        emit("if_all_ready", "No", room=room)


@socketio.on("player_left_room")
def on_playerLeft(data):
    id = data['id']
    room = data['room']
    ###Note this part needs to be implemented !!!!
    emit("player_left", {"id":id}, room=room)


@socketio.on("start_game")
def on_gameStarted(data):
    room = data['room']
    id = data['id']
    #Add a new GameManager to the current room.
    if game_rooms[room]['game'] is None:
        game_rooms[room]['game'] = GameManager.GameManager(game_rooms[room]['host'], game_rooms[room]['clients'])
    prompter_id = game_rooms[room]['host']
    Message = {"prompter":prompter_id}
    emit("enter_game", Message, room=room)
    #send all the users in the room(including the owner) a message containing{}
    #

@socketio.on("submit_prompt")
def on_submitPrompt(data):
    """ 
    This is the event the server listens to for getting the prompt from the prompter. It sends
    the prompt to the game_manager, who gets the results and returns 3 shuffled versions to
    display to the non-host clients, and ther real order to displa
    @param data - Dict with a query field, containing string for query (i.e. 'how to'), and room field, containing string with name of room.
    @return - emits the player key answer value dict of scrambled orders back to the client (real order for prompter).
    """
    room = data['room']
    prompt = data['prompt']
    print('received prompt from the prompter:',prompt)
    game = game_rooms[room]['game']
    suggestions = game.get_suggestions(prompt)
    # print('sending suggestions to the room:',suggestions)
    emit('display_suggestions', suggestions, room=room)

@socketio.on('submit_answer')
def on_submitAnswer(data):
    """
    This is the event the server listens to for getting an answer from one of the players. It sends the
    answer to the game manager, who adds the answers to its list. It then checks if all answers
    have been submitted, and if so, asks the game for the round and total score for each player.
    Emits scores, correct answer, and whether or not this is final round back to the front end.
    @param data - Dict with a room field, with a string of room name, and an answer field, a dict with a key of the username and value of their answer order.
    @return - Emits a dict with correct answers, answers for each player, and boolean telling front end if game is over.
    """
    room = data['room']
    answers = data['answers']
    id = data['id']
    game = game_rooms[room]['game']
    new_answer = {id: answers}
    # print("We received this new answer from a player: ",new_answer,"****\n")
    game.add_new_answer(new_answer)

    #Check if this entry caused the answers to all be submitted.
    all_answers = game.get_current_answers()
    if len(all_answers) == MAX_RESPONDERS:
        #Get the scores for players this round, total scores, and correct answer order.
        correct_answers = game.get_real_answers()
        round_scores = game.get_all_scores(all_answers)
        total_scores = game.get_total_scores()

        print(round_scores)
        print(total_scores)
        
        #Create a list with the user results.
        user_results = []
        for i in game_rooms[room]['clients']:
            user_results.append({'id':i, "name": game_rooms[room]['names'][i], 'total_score':total_scores[i], 'current_score':round_scores[i]})
        print(user_results)
        #Get the game_status
        game_over = not game.get_game_status()

        #Make the message from these components.
        Message = {'correct_answer':correct_answers, 'user_results':user_results}
        emit('send_scores', Message, room=room)
    #######################################################################################################################################
    ###################################################MODIFIED CODE BY SALEKH############################################################
    #######################################################################################################################################
    #Temporarily commented out for easy testing puposes ::NOTe!!!!
        # if game_over:
        #     #Reset the status of all players to not ready, let front end know they aren't ready,
        #     #let front end know that all players are no longer ready.
        #     for i in game_rooms[room]['clients']:
        #         game_rooms[room]['status'][i] = 'Not-Ready'
        #         emit("player_status_changed", {'id':i, 'status':"Not-Ready"}, room=room)
        #     emit("if_all_ready", "No",room=room)

        #     #Get rid of GameManager object.
        #     game_rooms[room]['game'] = None
    ######################################################################################################################################
    #######################################################################################################################################

answered_clients=[]
@socketio.on("start_new_round")
def on_newRound(data):
    """
    This is the event the server listens to for starting a new round, once client informs it that it has properly displayed the data.
    It updates the internals of the game state and then messages the front end the new prompter and responders, so that it can
    display the right page to them.
    @param data - Dict with a 'room' key specifying room name string.
    @return - Emits a message with the new prompter string , as a dict with keywords 'prompter'.
    """
    room = data['room']
    id = data['id']
    game = game_rooms[room]['game']
    answered_clients.append(id)


    #Add the ready status for this player to the GameManager list.
    game.add_new_ready_status({id:True})

    #######################################################################################################################################
    ###################################################MODIFIED CODE BY SALEKH############################################################
    #######################################################################################################################################
    ###ADDED PORTION---- I think the game over message should be sent by this end point, when the clients ask if they can start a new game
    game_over = not game.get_game_status()
    if game_over:
        for i in game_rooms[room]['clients']:
            game_rooms[room]['status'][i] = 'Not-Ready'
        
    #Note: if the game is over , the user needs this information to recreate the waitroom, of course the status info needs to changed here to make sure everyone is not ready
    Message={}
    users=[]
    for i in game_rooms[room]["clients"]: 
            users.append({'id':i, 'name':game_rooms[room]['names'][i], 'room':room, 'status':game_rooms[room]['status'][i]})
    Message={'users':users, 'owner_id':game_rooms[room]['host']}
    #Reset the status of all players to not ready, let front end know they aren't ready,
    #let front end know that all players are no longer ready.

   
    ready_statuses = game.get_new_round_ready_status()

    if len(ready_statuses)==4 and len(answered_clients)== 4:
        answered_clients.clear()
        game.update_round()
        round_number =game.get_current_round_number()
        Message = {'prompter':game.get_prompter(),'if_game_over':game_over,'room_creation_info':Message,'round_number':round_number}
        emit('new_round_permission', Message, room=room)
        if game_over:
            game.reset_game_to_fresh_state()
    #######################################################################################################################################
    #######################################################################################################################################


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
    answers = requests.get('http://3.85.238.64/query/', params=payload)
    #answers = requests.get('http://127.0.0.1:8000/query/', params=payload)
  
    print('answers received: ', answers.json())
    return jsonify(answers.json())



# Login route
# If login fails then send them back to the slash...
@app.route('/login', methods=['GET','POST'])
def do_admin_login():
    if request.method == 'POST':
        print('method post')
        print('request: ', request)
        print('request type: ', type(request))
        print('request form: ', request.form)
        print('request form keys: ', request.form.keys())
        return jsonify({"hello": "hello"})
    if request.form['password'] == "password" and request.form['username'] == "admin@ucla.edu":
        session['logged_in'] = True
        print('Session logged in: ', request.form)
        # Send back to front end.
    else:
        flash('wrong password!')
    return index() # returns back to index
    # If you are logged in 

if __name__ == '__main__':
    socketio.run(app,debug=True)
