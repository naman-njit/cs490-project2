from server import db


class Player(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    oauth_id = db.Column(db.String(255))
    name = db.Column(db.String(255))
    email = db.Column(db.String(320), unique=True)
