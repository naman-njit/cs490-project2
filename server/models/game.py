from datetime import datetime

from server import db


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player_x = db.Column(db.Integer, db.ForeignKey("player.id"))
    player_y = db.Column(db.Integer, db.ForeignKey("player.id"))
    board = db.Column(db.String(9))
    winner = db.Column(db.Integer, db.ForeignKey("player.id"))
    loser = db.Column(db.Integer, db.ForeignKey("player.id"))
    start_time = db.Column(db.DateTime, default=datetime.utcnow)
    end_time = db.Column(db.DateTime)
