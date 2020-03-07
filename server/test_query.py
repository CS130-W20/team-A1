import pytest
from query import get_query_from_goog
from lobby import get_query, app
from GameManager import GameManager
import urllib.request

def test_query_internal():
    """
    Here we test the internal functionality of our query Api 
    that is not the proxy
    @expects query "the cats" to get parsed and send to chrome Selenium plugin 
    @expects the returned parsed response to have length greater than 0
    """
    query = get_query_from_goog("the cats")
    assert(len(query) > 0)






    
