# GameManager module


### class GameManager.GameManager(prompter, respondents)
Bases: `object`

This class controls a google suggestion game, and is used by the
lobby in charge of client connections to get and perform game details.

Attributes:

    round (int): An integer with round number, initially 1. Once round > MAX_ROUNDS, game ends.
    prompter: String with name of current prompter. Initially host, changes to new person each round.
    respondents: List of strings with names of responders in game. Initially non-host lobby members, changes each round.
    real_answers: Contains the current correct order of answers for the current query. Changes with each new query.
    query: Current query given to us by lobby manager. Changes with each new query, used to get answers from google.
    scores: Current running game total of scores for each players, summed over the number of rounds that have occured.


#### \__init__(prompter, respondents)
Constructor for the GameManager class

Parameters:

    prompter – person to initialize as first prompter, the lobby host
    respondents – list of people in lobby to play the game, clients list


#### add_new_answer(answer)
” Adds a new answer that has been received by the client to the list of current_answers.

Parameters:

    answer – Dict with player name string as key and value as list of answers, in order.


#### get_all_scores(answers)
Gets and returns to lobby the scores for each respondent given the order they input to the game.

Parameters:

    answers – A dict of client name (Strings) keys to string list individual answers, containing order changed google query responses.

Returns:

    round_scores – A dict of client name (Strings) keys to int scores for that client on this round.


#### get_current_answers()
Returns current answers stored for each respondent to lobby.


#### get_game_status()
Returns current game status to lobby.

Returns:

    Boolean, true if game still occuring, false if game ended.


#### get_prompter()
Returns current prompter to lobby.

Returns:

    String of current prompter name.


#### get_respondents()
Returns current respondents to lobby.

Returns:

    List of strings, each a name of a current respondent.


#### get_score(answer)
Gets score for the given answer order.

Parameters:

    answer – A string list containing a given order of answers.

Returns:

    score – Score for the given answer, using real_answe. Uses length of current query \* # of position matches.


#### get_suggestions(query)
Gets a dictionary of google suggestions, order scrambled, for each player.

Parameters: 

    query – String with the current query to send to the server managing google requests.

Returns:

    dup_answers – Dict of string client keys, each accessing a string list with the order scrambled google suggestions for that player.


#### get_total_scores()
Returns current running total scores for all players to lobby.


#### update_round()
Updates the internal state of GameManager for the next round of the game, incrementing round and changing prompter/respondents.
