import data_handler

from flask import Flask, render_template, url_for, redirect, flash, request
from flask_login import current_user, login_user, logout_user, LoginManager, login_required
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.exc import IntegrityError
from flask_bcrypt import Bcrypt

from forms import RegistrationForm, LoginForm
from util import json_response
from config import Config

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)

with app.app_context():
    import models


@login_manager.user_loader
def load_user(user_id):
    return models.User.query.get(int(user_id))


@app.route("/", methods=["GET", "POST"])
def index():
    """
    This is a one-pager which shows all the boards and cards
    """
    login_form = LoginForm()
    register_form = RegistrationForm()
    try:
        if register_form.validate_on_submit():
            hashed_password = bcrypt.generate_password_hash(register_form.password.data).decode("utf-8")
            user = models.User(username=register_form.username.data, email=register_form.email.data,
                               password=hashed_password)
            db.session.add(user)
            db.session.commit()
            flash(f"Welcome {register_form.username.data}! You can now login.", "success")
            return redirect(url_for("index"))
    except IntegrityError:
        flash("User with provided username or email already exists.", "danger")
        return redirect(url_for("index"))

    if login_form.validate_on_submit():
        user = models.User.query.filter_by(email=login_form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, login_form.password.data):
            login_user(user, remember=login_form.remember.data)
            flash(f"Welcome back, {user.username}", "success")
        else:
            flash("Login failed. Please check email and password", "danger")
        return redirect(url_for("index"))


    return render_template('index.html', login_form=login_form, register_form=register_form)


@app.route("/logout")
def logout():
    if not current_user.is_authenticated:
        flash("You can not logout if you're not logged in, mate!", "info")
    else:
        logout_user()
        flash("Logged out. See you again!", "success")
    return redirect(url_for("index"))


@app.route("/get-boards")
@json_response
def get_boards():
    """
    All the boards
    """
    if current_user.is_authenticated:
        return data_handler.get_boards(public=False, owner_id=current_user.id)
    else:
        return data_handler.get_boards(public=True, owner_id=1)


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
    data = dict(request.form)
    if current_user.is_authenticated:
        data['owner_id'] = current_user.id
    else:
        data['owner_id'] = 1

    data['public'] = True

    return data_handler.add_new_board(data)


@app.route("/add-new-card/<card_title>/<board_id>/<status_id>/<order>", methods=['POST'])
@json_response
def add_new_card(card_title, board_id, status_id, order):
    card = {
        'title': card_title,
        'board_id': board_id,
        'status_id': status_id,
        'order': order
    }
    return data_handler.add_new_card(card)


@app.route("/add-priv-board", methods=['POST'])
@json_response
@login_required
def add_priv_board():
    """
    Creates new board.
    """
    data = dict(request.form)
    data['owner_id'] = current_user.id
    data['public'] = False

    return data_handler.add_new_board(data)


@app.route("/get-last-board-id", methods=['GET'])
@json_response
def get_last_board_id():
    """
    Get last board id.
    """
    return data_handler.get_last_board_id()


@app.route('/update-card-order/<cardId>/<cardOrder>', methods=['POST'])
def update_card_order(cardId, cardOrder):
    return data_handler.update_card_order(cardId, cardOrder)


def main():
    app.run(debug=True)

    # Serving the favicon
    with app.app_context():
        app.add_url_rule('/favicon.ico', redirect_to=url_for('static', filename='favicon/favicon.ico'))


if __name__ == '__main__':
    main()
