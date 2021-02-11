from flask import Blueprint, session


leaderboard_bp = Blueprint("leaderboard_bp", __name__, url_prefix="/api/leaderboard")


@leaderboard_bp.route("/list")
def leaderboard():
    data = [
        {"rank": 1, "name": "Naman", "points": 120},
        {"rank": 2, "name": "Anshul", "points": 88},
        {"rank": 3, "name": "Kris", "points": 60},
        {"rank": 4, "name": "David", "points": 0},
    ]
    return {"ranks": data}
