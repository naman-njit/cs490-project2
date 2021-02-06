import os
from flask import Flask, send_from_directory

app = Flask(__name__, static_folder='./build/static')

@app.route('/', defaults={"filename": "index.html"})
@app.route('/<path:filename>')
def index(filename):
    print(filename)
    return send_from_directory('./build', filename)
    
@app.route('/api/test/<value>')
def test(value):
    return {"test": value}


app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8081)),
    debug=True
)
