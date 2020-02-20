import os
import copy
import urllib.request
import re
from collections import defaultdict
import random

MAX_RESPONDERS=3

class GameManager:

    #Initialize a game. Lobby just has to pass in the clients list,
    #as we take care of only having the 3 respondents in the client list be
    def __init__(self, prompter, respondents):
        self.round = 1
        self.prompter = prompter,
        self.respondents = [x for x in respondents if x!= prompter]
        self.real_answers = None
        self.query = None

    #Need these so lobby knows who to send
    #prompter/respondent info to, as well as check
    #when game is over.
    def get_prompter(self):
        return self.prompter

    def get_respondents(self):
        return self.respondents

    def get_game_status(self):
        return self.round < 5

    #Lobby manager calls on its game
    #manager to get the suggestions to query from server, and return
    #tuple of shuffled answers and respondents
    def get_suggestions(self, query):
        
        #Set the current query to the given value.
        self.query = query
        query_address = 'http://3.85.238.64/query/?query=' + query

        #This simply uses the previous get_query code, but calls it from the game component instead.
        answers = urllib.request.urlopen(query_address).read()

        #Decode our answers, and use regex to convert them into a list of strings, in order.
        answers = re.findall(r'"([^"]*)"', answers.decode('utf-8'))
        print('answers received: ', answers)

        self.real_answers = answers

        #Now, we need to duplicate these queries. We get four copies in case the prompter would
        #like one. The first list of answers is for the first client, the second for the second, etc.
        dup_answers = {}
        for i in range(0,MAX_RESPONDERS):
            dup_answers[self.respondents[i]] = random.sample(self.real_answers, len(self.real_answers))

        #Returns a dictionary, where the keys are the usernames, and the values are
        #the list of answers which has been randomly shuffled for that respondent.
        return dup_answers

    #Get the score for an individual answer and query combo.
    #Assumes that answers are proper length. Probably need
    #more checking for this later on.
    def get_score(self, answer):

        positions_match = 0

        print(answer)

        #Get matching position number in answer.
        for i, suggestion in enumerate(answer):
            if self.real_answers[i] == suggestion:
                positions_match += 1

        #Score combines length of query and number of matches.
        return len(self.query) * positions_match

    #Get the scores for each person.
    def get_all_scores(self, answers):

        scores = {}

        #Get score for each respondent.
        for i in self.respondents:
            if i in answers:
                scores[i] = self.get_score(answers[i])
            else:
                print("This should not happen!!!!! Only people in lobby should play this game!")

        #Return dict with a numerical value for each username key.
        return scores

#Main function to test our functionality.
if __name__ == '__main__':

    test_manager = GameManager('orc', ['elf', 'human', 'magic_tree'])
    test_query = test_manager.get_suggestions('ucla')
    test_scores = test_manager.get_all_scores(test_query)
    print(test_scores)
