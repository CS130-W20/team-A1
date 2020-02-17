import flask
from flask import request, jsonify,render_template
from query import get_query_from_goog, close_goog
from flask_cors import CORS

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
    return render_template("home.html")
    return ''

@app.route('/query/', methods=['GET'])
def get_query():
    if 'query' in request.args:
        query = str(request.args['query'])
    else:
        return "Error must add query param to request"
    # Now use the query to call query function in other side and then display the answers
    # TODO: Clear existing first
    answers = get_query_from_goog(query)
    # close_goog()
    return jsonify(answers)

# go to http://127.0.0.1:5000/query/?query=k to test
app.run(port=8000) 