import persistence, util
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from models import User, Boards, Cards, Statuses

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)


def get_card_status(status_id):
    """
    Find the first status matching the given id
    :param status_id:
    :return: str
    """
    statuses = persistence.get_statuses()
    return next((status['title'] for status in statuses if status['id'] == str(status_id)), 'Unknown')


def get_card_statuses():
    """
    Get statuses
    :return: list
    """
    statuses = persistence.get_statuses()
    return [status['title'] for status in statuses]


# def get_boards():
#     """
#     Gather all boards
#     :return:
#     """
#     return persistence.get_boards(force=True)

def get_boards():
    public_boards = Boards.query.filter_by(owner_id=1).all()
    result = []
    for board in public_boards:
        new = {'id': board.id,
               'title': board.title,
               'owner_id': board.owner_id}
        result.append(new)
    return result


# def get_cards_for_board(board_id):
#     persistence.clear_cache()
#     all_cards = persistence.get_cards()
#     matching_cards = []
#     for card in all_cards:
#         if card['board_id'] == str(board_id):
#             card['status_id'] = get_card_status(card['status_id'])  # Set textual status for the card
#             matching_cards.append(card)
#     print(matching_cards)
#     return matching_cards


def get_cards_for_board(board_id):
    cards = Cards.query.filter_by(board_id=board_id).all()
    result = []
    for card in cards:
        new = {'id': card.id,
               'board_id': card.board_id,
               'title': card.title,
               'status_id': card.status.title,
               'order': card.order}
        result.append(new)

    return result


def add_new_board(title):
    new_board = Boards(title=title, owner_id=1)
    db.session.add(new_board)
    db.session.commit()
