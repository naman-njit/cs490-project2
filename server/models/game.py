from datetime import datetime

from server import db


class Game(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player_x = db.Column(db.Integer, db.ForeignKey("player.id"))
    player_o = db.Column(db.Integer, db.ForeignKey("player.id"))
    board = db.Column(db.String(9))
    winner = db.Column(db.Integer, db.ForeignKey("player.id"))
    loser = db.Column(db.Integer, db.ForeignKey("player.id"))
    start_time = db.Column(db.DateTime, default=datetime.utcnow)
    end_time = db.Column(db.DateTime)

    def x_win(self):
        self.winner = self.player_x
        self.loser = self.player_o
        self.end_time = datetime.utcnow()
        db.session.commit()

    def y_win(self):
        self.winner = self.player_o
        self.loser = self.player_x
        self.end_time = datetime.utcnow()
        db.session.commit()

    def draw(self):
        self.end_time = datetime.utcnow()
        db.session.commit()
