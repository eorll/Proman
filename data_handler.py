import persistence, util
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from models import User, Boards, Cards, Statuses
from sqlalchemy import or_

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


def get_boards(public, owner_id):

    if public:
        boards = db.session.query(Boards).filter(or_(Boards.public==True, Boards.public==None))

    else:
        boards = db.session.query(Boards).filter(or_(Boards.public==True, Boards.public==None, Boards.owner_id==owner_id))

    result = []
    for board in boards:
        new = {'id': board.id,
               'title': board.title,
               'owner_id': board.owner_id}
        result.append(new)
    db.session.commit()

    return result


def get_cards_for_board(board_id):
    cards = db.session.query(Cards).filter_by(board_id=board_id).all()
    result = []
    for card in cards:
        new = {'id': card.id,
               'board_id': card.board_id,
               'title': card.title,
               'status_id': card.status.title,
               'order': card.order}
        result.append(new)
    db.session.commit()

    return result


def add_new_board(board):
    new_board = Boards(title=board['title'], owner_id=board['owner_id'], public=board['public'])
    db.session.add(new_board)
    db.session.commit()
