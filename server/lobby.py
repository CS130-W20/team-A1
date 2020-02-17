import os

from flask import request, jsonify

from flask import Flask, render_template, url_for
from flask_socketio import SocketIO, emit, join_room, leave_room
from collections import defaultdict

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
socketio = SocketIO(app)

@app.route("/")
def index():
    return render_template('index.html',token="Hello This is Salek")


if __name__ == '__main__':
	socketio.run(app)
	
	
	