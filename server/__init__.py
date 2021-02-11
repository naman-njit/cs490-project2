from flask import Flask, json
from flask_socketio import SocketIO
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate(compare_type=True)
socketio = SocketIO()


def create_app(config=None):
    app = Flask(
        __name__,
        instance_relative_config=False,
        static_folder=config.STATIC_FOLDER,
        template_folder=config.TEMPLATE_FOLDER,
    )
    app.config.from_object(config)

    db.init_app(app)
    socketio.init_app(
        app,
        cors_allowed_origins="*",
        json=json,
        manage_session=False
    )
    migrate.init_app(app, db, render_as_batch=True)

    with app.app_context():
        import server.routes as routes
        from server.sockets import register_sockets

        register_sockets(socketio)

        app.register_blueprint(routes.app_bp)
        app.register_blueprint(routes.login_bp)
        app.register_blueprint(routes.leaderboard_bp)

    return app
