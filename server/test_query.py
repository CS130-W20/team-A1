import pytest
from query import get_query_from_goog
from lobby import get_query, app
import urllib.request

def test_query_internal():
    """
    Here we test the internal functionality of our query Api 
    that is not the proxy
    """
    query = get_query_from_goog("the cats")
    assert(len(query) > 0)


@pytest.fixture
def client(request):
    """
    Creates client fixture which can be used to access Flask API
    """
    test_client = app.test_client()

    def teardown():
        pass
    request.addfinalizer(teardown)
    return test_client

def get_json(client, url):
    response = client.get(url)
    return response

def test_query_proxy(client):
    """
    Tests lobby proxy server and its ability to ping query and extract 
    answers from query using the endpoint
    Tests: Response HTTP Status code, and length of data
    """
    response = get_json(client, '/query/?query=cat')
    assert(response.status_code==200)

    data = response.get_data()
    datastr = data.decode('utf-8')
    datalist= datastr.split(",")
    print('datarr: ', len(datalist))
    assert(len(datalist)>4)











    
