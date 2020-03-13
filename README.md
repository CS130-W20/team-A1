# Sample Project Title
Autocorrectly Game

## Directory Structure
Explanations on how the code is structures can be seen in our report part C
## Installation/Run instructions
#### First install dependencies
`npm install` from front_end/package.json and fron /package.json
Note: Then install any Yarn packages prompted. 
#### Then install requirements for python dependencies
`pip3 install flask flask-socketio requests` AND
`pip3 install -r requirements.txt`
#### To build react app
`npm run build`
#### To start python server(flask)
`python3 server/queryapi.py` (QueryAPI Internal)
`python3 lobby.py` (Lobby Server)
Then go to the local host server emitting from `lobby`. 


### Testing instructions
- You can refer to our [testreadme](https://github.com/CS130-W20/team-A1/blob/master/server/testreadme.md) for a complete list of testing scenarios and specific details
- To unit test the backend type `cd server && pytest`. Note you must install `pytest` beforehand. 
- To unit test the Internal Query API type `pytest server/test_query.py`. However this will only test your local and not our remote.
- To perform mutation testing you can type `cd server && mut.py --target GameManager --unit-test test_mutation -m && cd ..`.
- Mutation and Unit tests on GameManager will be performed automatically using TravisCI. 

### Documentation
- Your can refer to [docs](https://github.com/CS130-W20/team-A1/tree/master/server/docs) to see our documentation for GameManager and Lobby backend services.

## Relevant Links 
- Documentation link
- [GameManager Docs](https://github.com/CS130-W20/team-A1/blob/master/server/docs/GameManager.md)
- [Lobby docs](https://github.com/CS130-W20/team-A1/blob/master/server/docs/lobby.md)
- [Working url](https://18.208.153.149/)
- anything else



## --- Development
#### To start selenium server and test it...
`python3 queryapi.py`
Then hit this url with postman (local)
`http://127.0.0.1:5000/query/?query=<enterHere>`


### Directory Structure: Front End
```
├── package.json
├── public
│   ├── favicon.ico
│   ├── gameroom.html
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json
│   └── robots.txt
├── scripts
│   ├── build.js
│   ├── start.js
│   └── test.js
├── src
│   ├── App.css
│   ├── App.js
│   ├── Searchbox.css
│   ├── Searchbox.test.js
│   ├── components
│   │   ├── Context.js
│   │   ├── Frontpage.js
│   │   ├── Gameroom.js
│   │   ├── Landing.js
│   │   ├── Login.js
│   │   ├── Nonprompter.js
│   │   ├── Player.js
│   │   ├── Playerwait.js
│   │   ├── Playgame.js
│   │   ├── Prompter.js
│   │   ├── Roomcreation.js
│   │   ├── Roundend.js
│   │   ├── Searchbox.js
│   │   ├── SortableList.js
│   │   └── nonownerview.js
│   ├── index.css
│   └── index.js
└── yarn.lock
```

## Directory structure backend:
server
```
├── GameManager.py
├── GameManager.pyc
├── __init__.html
├── __init__.pyc
├── __pycache__
│   ├── GameManager.cpython-35.pyc
│   ├── __init__.cpython-35.pyc
│   ├── game.cpython-35.pyc
│   ├── lobby.cpython-35.pyc
│   ├── query.cpython-35.pyc
│   ├── queryapi.cpython-35.pyc
│   └── test_query.cpython-35-pytest-5.3.5.pyc
├── game.pyc
├── htmldocs
│   ├── Foo.html
│   ├── GameManager.html
│   └── __init__.html
├── lobby.py
├── package-lock.json
├── query.py
├── query.pyc
├── queryapi.py
├── queryapi.pyc
├── static
│   └── react
├── templates
│   └── index.html
├── test_query.py
└── testreadme.md
```

