# Sample Project Title
Autocorrectly Game

## Directory Structure
Explanations on how the code is structures can be seen in our report part C
## Installation/Run instructions
#### First install dependencies
`npm install` from front_end/package.json and fron /package.json
#### Then install requirements for python dependencies
`pip3 install flask flask-socketio requests`
#### To build react app
`npm run build`
#### To start python server(flask)
`python3 server/queryapi.py` (QueryAPI Internal)
`python3 lobby.py` (Lobby Server)
Then go to the local host server emitting from `lobby`. 


## Relevant Links 
- Documentation link
- Working URL (if any)
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

