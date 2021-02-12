from ..models import Player


def get_player_by_id(player_id):
    return Player.query.filter_by(id=player_id).first()


def get_player_name(player):
    if player is None:
        return None
    return {
        "id": player.id,
        "name": player.name
    }


def get_player_name_by_id(player_id):
    player = get_player_by_id(player_id)

    return get_player_name(player)
