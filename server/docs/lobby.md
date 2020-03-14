# lobby module


### lobby.get_query()
RESTful GET method with Query (string) on request argument in URL
Return JSON answers list with extracted google suggestions
@ImplicitParam request.args<String>
@Returns: JSON object of List of extracted answers


### lobby.handle_my_custom_event(json)

### lobby.index()
Returns the / landing page index.html


### lobby.on_create(data)
This is the event the server is listening to for creating game rooms.
The lobby manager will generate a random lobby name for the player
requesting the creation. 
The lobby manager will save the instance of the lobby in the game_rooms data structure
* @param data - a dict. containing the username of the player requesting the creation
* @return - emits an event back to the front-end client, the front-end client should
be expecting ‘lobby_created’ with the details of the lobby sent through the socket


### lobby.on_destroy(data)
This is the event the server is listening to for destroying game rooms.
The lobby manager will attempt to destory the lobby instance if the player requesting is the host
* @param data - a dict containing the username and lobby of the player requesting the join
* @return - emits an event back to the front-end client, the front-end client should
be expecting ‘lobby_destroyed’ if successful


### lobby.on_join(data)
This is the event the server is listening to for joining game rooms.
The lobby manager will attempt to join the game room if it exists and is not full
The lobby manager will update the instance of the lobby object in memory
* @param data - a dict containing the username and lobby of the player requesting the deletion
* @return - emits an event back to the front-end client, the front-end client should
be expecting ‘player_suc_join’ if successful. Also emits ‘game_ready’ if all 4 players in.

### lobby.on_playerReady(data)
This is the event the server is listening to for when players ready up.
The lobby manager will change the ready status of this player to ready.
The lobby manager will update the instance of status in memory as ready for this player,
and send a signal to the fornt end if all players are ready.
* @param data - a dict containing the id and room of the player readying up.
* @return - emits an event back to the front-end client, the front-end client should
be expecting "player_status_changed" if successful and "if_all_ready" with "Yes" if all players ready.

### lobby.on_playerUnready(data)
This is the event the server is listening to for when players unready.
The lobby manager will change the ready status of this player to unready.
The lobby manager will update the instance of status in memory as unready for this player,
and send a signal to the fornt end if all players were ready and now they are not.
* @param data - a dict containing the id and room of the player unreadying.
* @return - emits an event back to the front-end client, the front-end client should
be expecting "player_status_changed" if successful and "if_all_ready" with "No" if all players are no longer ready.

### lobby.on_playerLeft(data)
This is the event the server is listening for when a players leaves the room.
The lobby manager will have that player leave the room, and delete their data.
If they were the host, then it will either delete the room if they were the last
player, or transfer host status to another player for this room.
* @param data - dict containing id and room name of player leaving
* @returns - emits an event back to the front end of "player_left", letting it know
if the host changed or not

### lobby.on_gameStarted(data)
This is the event the server listens to for starting the game. It creates a new GameManager
object, and then tells the front end that who the prompter for the games is.
* @param data - dict with the id of the player sending the mssage and the game room they are in
* @return - emits the prompter id in a message "enter_game" giving the front end room permission to start the game.

### lobby.on_submitPrompt(data)
This is the event the server listens to for getting the prompt from the prompter. It sends
the prompt to the game_manager, who gets the results and returns 3 shuffled versions to
display to the non-host clients, and ther real order to displa
* @param data - Dict with a query field, containing string for query (i.e. 'how to'), and room field, a string with name of room.
* @return - emits the player key answer value dict of scrambled orders back to the client (real order for prompter).
   
### lobby.on_submitAnswer(data):
This is the event the server listens to for getting an answer from one of the players. It sends the
answer to the game manager, who adds the answers to its list. It then checks if all answers
have been submitted, and if so, asks the game for the round and total score for each player.
Emits scores, correct answer, and whether or not this is final round back to the front end.
* @param data - Dict with a room field, with a string of room name, and an answer field, a dict with a key of the username and value of their answer order.
* @return - Emits a dict with correct answers, answers for each player, and boolean telling front end if game is over.
    
### lobby.on_newRound(data)
This is the event the server listens to for starting a new round, once client informs it that it has properly displayed the data.
It updates the internals of the game state and then messages the front end the new prompter and responders, so that it can
display the right page to them.
* @param data - Dict with a 'room' key specifying room name string.
* @return - Emits a message with the new prompter string , as a dict with keywords 'prompter'.

### lobby.on_destroy(data)
This is the event the server is listening to for destroying game rooms.
The lobby manager will attempt to destory the lobby instance if the player requesting is the host
* @param data - a dict containing the username and lobby of the player requesting the join
* @return - emits an event back to the front-end client, the front-end client should
be expecting 'lobby_destroyed' if successful
