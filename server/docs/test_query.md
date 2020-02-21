# test_query module


### test_query.client(request)
Creates client fixture which can be used to access Flask API
@returns: instance of testable flask app


### test_query.get_json(client, url)
Utilizes Flask client to access GET request.
@param{url}: at ‘/query/?query=<queryhere>’ url


### test_query.test_GameManagerInputs()
Tests GameManager input data prompter and respondents and GET abilities of those props
Expects: GameManager instance GET methods to get prompter, and get_respondents to receive String and List of strings


### test_query.test_GameManagerQueryGet()
Here we test the GameManager get_suggestions method
We expect to see four answers (response from server) that are shuffled
If they are not shuffled answers we will throw an error.


### test_query.test_query_internal()
Here we test the internal functionality of our query Api 
that is not the proxy
@expects query “the cats” to get parsed and send to chrome Selenium plugin 
@expects the returned parsed response to have length greater than 0


### test_query.test_query_proxy(client)
Tests lobby proxy server and its ability to ping query and extract 
answers from query using the endpoint
Tests: Response HTTP Status code, and length of data
Expected: Response as byte type with status code 200
Expected Response converted to ArrayList with length greater than 4
