import os
from flask import session
from flask_cors import CORS

from server import create_app, socketio
from config import Config


config = Config()
app = create_app(config)

cors = CORS(app, resources={r"/*": {"origins": "*"}})

host = os.getenv("IP", "0.0.0.0")
if os.getenv("C9_PORT"):
    port = 8081
else:
    port = int(os.getenv("PORT", "8081"))

socketio.run(
    app,
    host=host,
    port=port,
    debug=True
)
