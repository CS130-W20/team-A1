#### Testing cases

### 1. Internal Query Testing
`test_query_internal`
* Test query internal
* Expects parsed response returned upon query (string) entered into internal API
* Expects parsed response to have length > 0 (more than 1 response) to valid inputs
* calls `get_query_from_goog(query)` which is Internal Query API function.

## 2. Lobby API Query Proxy Testing
* `test_query_proxy(client)`
*  Tests lobby proxy server and its ability to ping query and extract 
    * answers from query using the endpoint
    * Tests: Response HTTP Status code, and length of data
    * Expected: Response as byte type with status code 200
    * Expected Response converted to ArrayList with length greater than 4
    * Expects `client` to be a fixture based on testable flask app

## 3. GameManager testing
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
