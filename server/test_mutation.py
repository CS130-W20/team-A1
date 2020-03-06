from unittest import TestCase
from GameManager import GameManager

class GameManagerTest (TestCase):
    def test_inputs_mul(self): 
        gameManager = GameManager("Jonathan", ["Omar", "Joey", "Salekh"])
        self.assertEqual(str, type(gameManager.get_prompter()[0]))
        self.assertEqual(list, type(gameManager.get_respondents()))

    def test_gamemanager_query_get(self):
        gameManager = GameManager("Jonathan", ["Omar", "Joey", "Salekh"])
        q = gameManager.get_suggestions("dogfish")
        # Check that the keys() of answers received correspond to the respondents
        del q['Jonathan']
        self.assertEqual(sorted(q.keys()),sorted(gameManager.get_respondents()))

        # Check to see if suggestions are shuffled:
        p1, p2, p3 = q.keys()
        self.assertEqual( (q[p1] != q[p2] != q[p3]), True)