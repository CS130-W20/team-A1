import urllib.request
import re
from collections import defaultdict
import random

MAX_RESPONDERS = 3
MAX_ROUNDS = 4

class GameManager:
    """ This class controls a google suggestion game, and is used by the
    lobby in charge of client connections to get and perform game details.

    Attributes:
        round (int): An integer with round number, initially 1. Once round > MAX_ROUNDS, game ends.
        prompter: String with name of current prompter. Initially host, changes to new person each round.
        respondents: List of strings with names of responders in game. Initially non-host lobby members, changes each round.
        real_answers: Contains the current correct order of answers for the current query. Changes with each new query.
        query: Current query given to us by lobby manager. Changes with each new query, used to get answers from google.
        scores: Current running game total of scores for each players, summed over the number of rounds that have occured.
    """

    #Initialize a game. Lobby just has to pass in the clients list,
    #as we take care of only having the 3 respondents in the client list be
    def __init__(self, prompter, respondents):
        """ Constructor for the GameManager class

        Parameters:
            prompter -- person to initialize as first prompter, the lobby host
            respondents -- list of people in lobby to play the game, clients list
        """

        self.round = 1
        self.prompter = prompter,
        self.respondents = [x for x in respondents if x!= prompter]
        self.real_answers = None
        self.query = None
        self.scores = {}

    def get_prompter(self):
        """ Returns current prompter to lobby.
        
        Returns:
            String of current prompter name.
        """
        return self.prompter

    def get_respondents(self):
        """ Returns current respondents to lobby.
        
        Returns:
            List of strings, each a name of a current respondent.
        """
        return self.respondents

    def get_game_status(self):
        """ Returns current game status to lobby.
        
        Returns:
            Boolean, true if game still occuring, false if game ended.
        """
        return self.round < MAX_ROUNDS + 1

    def get_total_scores(self):
        """Returns current running total scores for all players to lobby."""
        return self.scores

    def get_suggestions(self, query):
        """ Gets a dictionary of google suggestions, order scrambled, for each player.

        Parameters: 
            query -- String with the current query to send to the server managing google requests.

        Returns:
            dup_answers -- Dict of string client keys, each accessing a string list with the order scrambled google suggestions for that player.
        """
        
        self.query = query
        query_address = 'http://3.85.238.64/query/?query=' + query
        #This simply uses the previous get_query code, but calls it from the game component instead.
        answers = urllib.request.urlopen(query_address).read()
        #Decode our answers, and use regex to convert them into a list of strings, in order.
        answers = re.findall(r'"([^"]*)"', answers.decode('utf-8'))
        print('answers received: ', answers)
        self.real_answers = answers
        dup_answers = {}
        for i in range(0,MAX_RESPONDERS):
            dup_answers[self.respondents[i]] = random.sample(self.real_answers, len(self.real_answers))
        return dup_answers

    def get_score(self, answer):
        """ Gets score for the given answer order.

        Parameters:
            answer -- A string list containing a given order of answers.

        Returns:
            score -- Score for the given answer, using real_answe. Uses length of current query * # of position matches.
        """

        positions_match = 0
        print(answer)
        #Get matching position number in answer.
        for i, suggestion in enumerate(answer):
            if self.real_answers[i] == suggestion:
                positions_match += 1
        return len(self.query) * positions_match

    def get_all_scores(self, answers):
        """ Gets and returns to lobby the scores for each respondent given the order they input to the game.

        Parameters:
            answers -- A dict of client name (Strings) keys to string list individual answers, containing order changed google query responses.

        Returns:
            round_scores -- A dict of client name (Strings) keys to int scores for that client on this round.
        """

        round_scores = {}
        #Get score for each respondent, and add it to their total.
        for i in self.respondents:
            if i in answers:
                round_scores[i] = self.get_score(answers[i])
                #Check this player has already gotton one score.
                if i in self.scores:
                    self.scores[i] += round_scores[i]
                #Initialize their total score.
                else:
                    self.scores[i] = round_scores[i]
            else:
                print("This should not happen!!!!! Only people in lobby should play this game!")
        return round_scores

    def update_round(self):
        """ Updates the internal state of GameManager for the next round of the game, incrementing round and changing prompter/respondents."""
        self.round += 1
        new_respondent = self.prompter
        self.prompter = self.respondents[0]
        self.respondents = self.respondents[1:3]
        self.respondents.append(new_respondent)

