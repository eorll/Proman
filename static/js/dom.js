// It uses data_handler.js to visualize elements
import {dataHandler} from "./data_handler.js";

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
        let boardContainer = document.getElementById('row')
        let boardExample = document.getElementById('board');

        for (let board of boards) {
            let newBoard = boardExample.cloneNode(true)
            newBoard.id = `board ${board.id}`
            let boardTitle = newBoard.getElementsByClassName('d-inline me-auto project-board-title')
            boardTitle[0].innerHTML = board.title
            let newCol = newBoard.getElementsByClassName("btn btn-brown border-success float-end d-inline new-col")
            newCol[0].id = `newCol ${board.id}`
            let colContainer = newBoard.getElementsByClassName("row flex-nowrap overflow-auto me-0")
            colContainer[0].id = `column-container-${board.id}`
            dom.loadCards(board.id)
            boardContainer.appendChild(newBoard)
        }
        boardExample.remove()

    },
    loadCards: function (boardId) {
        dataHandler.getCardsByBoardId(boardId, function (cards) {
            dom.showStatuses(cards, boardId);
            dom.showCards(cards, boardId);

        });
    },
    showCards: function (cards, boardId) {
        let cardExample = document.getElementById('card-example')
        for (let card of cards) {
            let newCard = cardExample.cloneNode(true)
            newCard.id = `card ${card.id}`
            let cardSpot = document.getElementById(`column ${card.status_id} ${boardId}`)
            let cardTitle = newCard.getElementsByClassName("d-inline me-auto card-title")
            cardTitle[0].innerHTML = card.title
            let cardOrder = newCard.getElementsByClassName("badge rounded-pill bg-secondary float-end")
            cardOrder[0].innerHTML = card.order
            cardSpot.appendChild(newCard)
        }

    },
    showStatuses: function (cards, boardId) {
        let cardsStatuses = [];
        for (let card of cards) {
            if (!(cardsStatuses.includes(card.status_id))) {
                cardsStatuses.push(card.status_id)
            }
        }
        let statusesContainer = document.getElementById(`column-container-${boardId}`)
        let columnExample = document.getElementById('column')
        for (let cardsStatus of cardsStatuses) {
            let newColumn = columnExample.cloneNode(true)
            newColumn.id = `column ${cardsStatus} ${boardId}`
            let title = newColumn.getElementsByClassName("column_name btn-dark d-block w-100 my-0 text-center")
            title[0].innerHTML = cardsStatus
            statusesContainer.appendChild(newColumn)
        }
        columnExample.remove()
    },
    addBoardBtn: function () {
        let btn = document.getElementById('add-board-btn');
        btn.addEventListener('click', event => {
            let boardForm = new FormData(document.getElementById('new-board-form'))
            dataHandler.createNewBoard(boardForm);
        })
    }
};
