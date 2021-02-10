from flask import Blueprint, session


login_bp = Blueprint("login_bp", __name__, url_prefix="/api/login")


@login_bp.route("/<username>")
def login(username):
    session["username"] = username
    return {"username": username}
