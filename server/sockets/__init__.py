from flask import session


def register_sockets(socketio):
    @socketio.on("connect")
    def on_connect():
        print(session)
        return session

    @socketio.on("click")
    def on_click(pos):
        socketio.emit("click",  pos, broadcast=True, include_self=False)
        return pos
