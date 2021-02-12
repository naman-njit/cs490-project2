from server import db
from ..models import Game


def get_ongoing_game():
    game = Game.query.filter_by(end_time=None).first()
    if not game:
        game = Game(board=" "*9)
        db.session.add(game)
        db.session.commit()
    return game
