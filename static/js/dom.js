// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";
import {element} from "./elements.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
        initEvents();
    },
    loadBoards: function () {
        // retrieves boards and makes showBoards called
        dataHandler.getBoards(function (boards) {
            dom.showBoards(boards);

        });
    },
    showBoards: function (boards) {
        // shows boards appending them to #boards div
        // it adds necessary event listeners also
        let boardBox = document.getElementById('row')
        for (let board of boards) {
            let newBoard = element.board(board)
            boardBox.appendChild(newBoard)
            dom.loadCards(`${board.id}`)
        }
    },
    loadCards: function (boardId) {
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showStatuses(cards, boardId);
            dom.showCards(cards, boardId);

        });
    },
    showCards: function (cards, boardId) {
        for (let card of cards) {
            let cardBox = document.getElementById(`card-box ${card.status_id} ${boardId}`);
            let newCard = element.card(card);
            cardBox.appendChild(newCard)
        }

    },
    showStatuses: function (cards, boardId) {
        let cardsStatuses = [];
        let columnBox = document.getElementById(`column-container ${boardId}`);
        for (let card of cards) {
            if (!(cardsStatuses.includes(card.status_id))) {
                cardsStatuses.push(card.status_id);
            }
        }
        for (let status of cardsStatuses) {
            let newColumn = element.column(status, boardId);
            columnBox.appendChild(newColumn)
        }
    },
    addBoardBtn: function () {
        let btn = document.getElementById('add-board-btn');
        btn.addEventListener('click', event => {
            let boardForm = new FormData(document.getElementById('new-board-form'))
            dataHandler.createNewBoard(boardForm, function(board) {
                dom.loadBoard(board)
            });
            $(`#addBoard`).modal('hide');
        })
    },
    loadBoard: function (board) {
        let boardBox = document.getElementById('row');
        let newBoard = element.board(board);
        boardBox.insertBefore(newBoard, boardBox.childNodes[0]);
    },
};
