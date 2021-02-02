// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";
import {element} from "./elements.js";
import * as events from "./events.js";

export let dom = {
    init: function () {
        // This function should run once, when the page is loaded.
        this.loadBoards();
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
        let boardBox = $('#boards-container');
        for (let board of boards) {
            let newBoard = element.getBoard(board);
            boardBox.append(newBoard);
            events.initEditingBoardName(newBoard);
            events.initAddColumnBtn(newBoard);
            dom.loadCards(`${board.id}`);
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
            let cardBox = $(`#card-box-${card.status_id}-${boardId}`).children('.card-container');
            let newCard = element.getCard(card);
            events.onDragCard(newCard);
            cardBox.append(newCard);
        }
    },
    showStatuses: function (cards, boardId) {
        let cardsStatuses = [];
        let columnBox = $(`#board-${boardId} .card-body .container-fluid .project-col-container`);
        for (let card of cards) {
            if (!(cardsStatuses.includes(card.status_id))) {
                cardsStatuses.push(card.status_id);
            }
        }
        for (let status of cardsStatuses) {
            let newColumn = element.getColumn(status, boardId);
            events.initEditingColumnName(newColumn);
            events.onDropCardOverColumn(newColumn);
            columnBox.append(newColumn);
        }
    },
    initEventAddBoardBtn: function () {
        let btn = document.getElementById('add-board-btn');
        btn.addEventListener('click', events.newColumn);
    },
    loadBoard: function (board) {
        let boardBox = document.getElementById('row');
        let newBoard = element.getBoard(board);
        boardBox.insertBefore(newBoard, boardBox.childNodes[0]);
    },
};
