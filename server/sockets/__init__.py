from flask import session

from server import db
from ..models import Game
from ..utils import get_ongoing_game, get_player_by_id, get_player_name_by_id


def register_sockets(socketio):
    @socketio.on("connect")
    def on_connect():
        print(session)
        return session

    @socketio.on("click")
    def on_click(pos):
        print("\n"*10)
        print("CLICK")
        socketio.emit("click", pos, broadcast=True)

    @socketio.on("restart")
    def restart():
        socketio.emit("again", broadcast=True)

    @socketio.on("load")
    def load():
        game = get_ongoing_game()

        return {
            "board": game.board,
            "player_x": get_player_name_by_id(game.player_x),
            "player_o": get_player_name_by_id(game.player_o),
            "winner": game.winner,
            "loser": game.loser,
            "start_time": game.start_time,
        }

    @socketio.on("join")
    def join(is_player_x):
        print("TRYING TO JOIN")
        user_id = session["user_id"]
        game = get_ongoing_game()

        if is_player_x:
            if game.player_x:
                return "Already joined"
            game.player_x = user_id
        else:
            if game.player_o:
                return "Already joined"
            game.player_o = user_id

        db.session.commit()
        socketio.emit(
            "join",
            {
                "player": get_player_name_by_id(user_id),
                "is_player_x": is_player_x
            },
            broadcast=True
        )
