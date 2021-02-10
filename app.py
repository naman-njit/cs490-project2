import os
from flask import Flask, send_from_directory, json, session
from flask_socketio import SocketIO
from flask_cors import CORS

app = Flask(__name__, static_folder="./build/static")
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY", "secret!")
cors = CORS(app, resources={r"/*": {"origins": "*"}})
socketio = SocketIO(
    app,
    cors_allowed_origins="*",
    json=json,
    manage_session=False
)


@app.route("/", defaults={"filename": "index.html"})
@app.route("/<path:filename>")
def index(filename):
    print(filename)
    return send_from_directory("./build", filename)


@app.route("/api/login/<username>")
def login(username):
    session["username"] = username
    return {"username": username}


@socketio.on("connect")
def on_connect():
    print(session)
    return session


@socketio.on("click")
def on_click(pos):

    socketio.emit("click",  pos, broadcast=True, include_self=False)
    return pos

host = os.getenv("IP", "0.0.0.0")
if os.getenv("C9_PORT"):
    port = 8081
else:
    port = int(os.getenv("PORT", "8081"))

socketio.run(
    app,
    host=os.getenv("IP", "0.0.0.0"),
    port=port,
    debug=True
)
    