import data_handler
import json

from flask import Flask, render_template, url_for, request

from util import json_response

app = Flask(__name__)


@app.route("/")
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    boards = json.loads(get_boards().data)

    return render_template('index.html', boards=boards)


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    return data_handler.get_boards()


@app.route("/get-cards/<int:board_id>")
@json_response
def get_cards_for_board(board_id: int):
    """
    All cards that belongs to a board
    :param board_id: id of the parent board
    """
    return data_handler.get_cards_for_board(board_id)


@app.route("/get-statuses/")
@json_response
def get_statuses():
    """
    All the statuses
    """
    return data_handler.get_card_statuses()


@app.route("/add-board", methods=['POST'])
@json_response
def add_board():
    """
    Creates new board.
    """
    if request.method == 'POST':
        data = dict(request.form)
        data_handler.add_new_board(data['title'])
    else:
        return print('Error')

    return print(data)


app.jinja_env.globals.update(get_cards_for_board=get_cards_for_board,
                             get_statuses=get_statuses,
                             json=json)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
