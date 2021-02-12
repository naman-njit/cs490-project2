import json
import requests
from flask import Blueprint, session, request

from server import db
from ..models import Player


login_bp = Blueprint("login_bp", __name__, url_prefix="/api/login")


@login_bp.route("/<username>")
def login(username):
    session["username"] = username
    return {"username": username}


@login_bp.route("/oauth", methods=["POST"])
def oauth():
    session.permanent = True

    data = json.loads(request.data)
    token_id = data["user"]["tokenId"]
    info = requests.get(
        f"https://oauth2.googleapis.com/tokeninfo?id_token={token_id}"
    ).json()
    if "error" in info:
        return {"message": "Token is invalid"}, 400
    name = info["name"]
    email = info["email"]
    oauth_id = info["sub"]
    query_user = Player.query.filter_by(email=email).first()
    if query_user is None:
        user = Player(name=name, oauth_id=oauth_id, email=email)
        db.session.add(user)
        db.session.commit()

        session["user_id"] = user.id

        return {
            "message": "Successfully created",
            "user_id": user.id,
            "name": user.name,
        }

    session["user_id"] = query_user.id

    return {
        "message": "Account already exists",
        "user_id": query_user.id,
        "name": query_user.name,
    }
