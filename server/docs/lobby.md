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
@param data - a dict. containing the username of the player requesting the creation
@return - emits an event back to the front-end client, the front-end client should
be expecting ‘lobby_created’ with the details of the lobby sent through the socket


### lobby.on_destroy(data)
This is the event the server is listening to for destroying game rooms.
The lobby manager will attempt to destory the lobby instance if the player requesting is the host
@param data - a dict containing the username and lobby of the player requesting the join
@return - emits an event back to the front-end client, the front-end client should
be expecting ‘lobby_destroyed’ if successful


### lobby.on_join(data)
This is the event the server is listening to for joining game rooms.
The lobby manager will attempt to join the game room if it exists and is not full
The lobby manager will update the instance of the lobby object in memory
@param data - a dict containing the username and lobby of the player requesting the deletion
@return - emits an event back to the front-end client, the front-end client should
be expecting ‘player_suc_join’ if successful. Also emits ‘game_ready’ if all 4 players in.


### lobby.on_new_round(data)
This is the event the server listens to for starting a new round, once client informs it that it has properly displayed the data.
It updates the internals of the game state and then messages the front end the new prompter and responders, so that it can
display the right page to them.
@param data - Dict with a ‘room’ key specifying room name string.
@return - Emits a message with the new prompter string and new responders list of strings, as a dict with keywords ‘prompter’ and ‘respondents’,

> 
> * if game still going. If game just ended, then emits game over with a dict of player name to score to all players in that lobby.


### lobby.on_prompt(data)
This is the event the server listens to for getting the prompt from the prompter. It sends
the prompt to the game_manager, who gets the results and returns 3 shuffled versions to
display to the non-host clients.
@param data - Dict with a query field, containing string for query (i.e. ‘how to’), and room field, containing string with name of room.
@return - emits the player key answer value dict of scrambled orders back to the client.


### lobby.on_submit(data)
This is the event the server listens to for getting an answer from one of the players. It sends the
answer to the game manager, who adds the answers to its list. It then checks if all answers
have been submitted, and if so, asks the game for the full score.
@param data - Dict with a room field, with a string of room name, and an answer field, a dict with a key of the username and value of their answer order.
@return - Emits a waiting message if this is not the final answer, or emits the a dict with a key for each username containing each person’s scores.
