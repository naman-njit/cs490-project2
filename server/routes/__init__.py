from flask import Blueprint, current_app, send_from_directory

from .login import login_bp

app_bp = Blueprint(
    "app_bp",
    __name__,
)


@app_bp.route("/", defaults={"filename": "index.html"})
@app_bp.route("/<path:filename>")
def get_client(filename):
    return send_from_directory(current_app.template_folder, filename)


@app_bp.errorhandler(404)
def page_not_found(_e):
    return send_from_directory(current_app.template_folder, "index.html")
