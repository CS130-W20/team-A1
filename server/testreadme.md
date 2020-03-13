#### Testing cases

### 1. Internal Query Testing
[file](https://github.com/CS130-W20/team-A1/blob/master/server/test_query.py)
We have unit tests that test the internal QueryApi that is not exposed to the user. We test the endpoint with GET request and verify that we are able to extract good meaningful data with valid GET request urls with Selenium. 
`test_query_internal`
* Test query internal
* Expects parsed response returned upon query (string) entered into internal API
* Expects parsed response to have length > 0 (more than 1 response) to valid inputs
* calls `get_query_from_goog(query)` which is Internal Query API function.

## 2. Lobby API Query Proxy Testing
[file](https://github.com/CS130-W20/team-A1/blob/master/server/test_gamemanager.py)

* `test_query_proxy(client)`
*  Tests lobby proxy server and its ability to ping query and extract 
    * answers from query using the endpoint
    * Tests: Response HTTP Status code, and length of data
    * Expected: Response as byte type with status code 200
    * Expected Response converted to ArrayList with length greater than 4
    * Expects `client` to be a fixture based on testable flask app

## 3. GameManager testing 
[file](https://github.com/CS130-W20/team-A1/blob/master/server/test_gamemanager.py)
#### 3A Input testing
* `test_GameManagerInputs` 
* Tests gameManager GET methods including `getPrompter` and `getRespondents`
* Expects them to be of type string and list, which are confirmed by test passing

#### 3B Query API usage testing
* `test_GameManagerQueryGet()`
* Tests gameManager instance to make sure it is able to securely send query using Lobby GET method (tested above) to extract answers/suggestions via the proxy.
* expects to receive a query object back of type dict with keys for each repondent enteretd in the GameManager instance
* Checks to see that repondents are same as keys in query object
* Checks to see that query object contains unique answers for each participant 
* If all the cases pass then we are able to receive data from the gameManager `get_suggestions(query)` method and that data is valid.

## 4. Mutation Testing
[file](https://github.com/CS130-W20/team-A1/blob/master/server/test_mutation.py)
* Mutation testing is implemented inside `test_mutation.py`. This tests the GameManagers's `get_suggestions()` function as well as instantiation of GameManager instances.
* TestGetSuggest() places in many different query types and checks to see if there is an accurate response. This is meaningful because it shows us how robust our system is to faulty queries that prompter might present. If a query doesn't make sense, then google's knowledge engine may not provide adequate results or enough results for that matter which will result in an error in our system. The mutation test clearly exposes this.
* test_GameManagerInputs() tests the creation of GameManager instances to make sure the input (String Prompter, ArrayList<String> Players[3]) are handled correctly. 
