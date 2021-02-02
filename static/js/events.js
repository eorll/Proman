import {dataHandler} from "./data_handler.js";
import {dom} from "/static/js/dom.js";

export function initEvents() {
    initAddColumn();
}

export function initEditingColumnName(obj$) {
    obj$.children('.card-body').children('.project-status-title').on('dblclick', onDblClick);
}

export function initEditingBoardName(obj$) {
    obj$.children('.card-header').children('.project-board-title').on('dblclick', onDblClick);
}

function initAddColumn() {
    $(".new-col").click(addColumn)
}

export function onDragCard(card$) {
    card$.get(0).addEventListener('dragstart', onDragStart);
    card$.get(0).addEventListener('dragend', onDragEnd);
    card$.get(0).addEventListener('drag', onDrag);

    card$.get(0).addEventListener('dragover', allowDrop);
    card$.get(0).addEventListener('drop', onDropBeforeCard);
}

export function onDropCardOverColumn(col$) {
    col$.get(0).addEventListener('drop', onDropInColumn);
    col$.get(0).addEventListener('dragover', allowDrop);
}

function onDblClick(e) {

    let input = $('<input>');
    input.attr('type', 'text');

    if ($(e.target).hasClass('project-status-title')) {
        input.addClass('input d-inline-block bg-transparent text-light border-0 my-0 text-center w-100');
    } else if ($(e.target).hasClass('project-board-title')) {
        input.addClass('input d-inline-block bg-transparent text-light border-0 my-0');
    }

    input.val(e.target.innerText);

    $(e.target).addClass('d-none');
    $(e.target).after(input);
    input.focus();
    input.select();

    input.on('keypress', function (e) {
        // If you pressed enter
        if (e.which === 13) {
            renameBoardNode($(e.target));
        }
    });
    input.on('focusout', function (e) {
        renameBoardNode($(e.target));
    });
    $(document).on('keydown', function (e) {
        if (e.which === 27) {
            displayTitle($(e.target));
        }
    });
}

function renameBoardNode(input$) {
    let newTitle = input$.val();
    input$.prev().text(newTitle);
    displayTitle(input$);
}

function displayTitle(input$) {
    input$.prev().removeClass('d-none');
    input$.remove();
}


function addColumn(e) {
    let columnsContainer = $(this).parent().parent().siblings(".flex-nowrap:first");

    let colDiv = $("<div>", {
        class: "card m-3 d-inline-block flex-nowrap bg-dark text-light border-light",
        style: "width: 20%; min-width: 12rem;",
        id: $(e.target).attr("id") + "tmp",
        draggable: "true"

    })
    let innerDiv = $("<div>", {
        class: "card-body text-center"
    })
    let input = $("<input>", {
        type: "text",
        class: "title-input",
        id: "inputCont"
    })
    let column = colDiv.append(
        innerDiv.append(input))
        .append($("<hr>"))


    if ($(e.target).html() === "New column") {
        columnsContainer.prepend(column);
        $(e.target).html("Cancel");
        input.select();
    } else {
        $("#" + $(e.target).attr("id") + "tmp").remove();
        $(e.target).html("New column");
    }

    let btn = $(e.target);

    $(".title-input").keypress(function (e) {
        if (e.keyCode === 13) {
            let titleVal = $(e.target).val();
            let title = $("<h5>", {
                type: "text",
                class: "column_name btn-dark d-block w-100 my-0 text-center",
                draggable: "false",
                html: titleVal
            });
            if (title.length > 0) {
                $(e.target).replaceWith(title)
                btn.html("New column")
            }
        }
    });
}

function allowDrop(e) {
    e.preventDefault();
}

function onDragStart(e) {
    console.log('Drag start.');
    console.log(e.currentTarget);
    e.currentTarget.classList.add('dragging');
    e.dataTransfer.setData("text", e.currentTarget.id);
}

function onDrag(e) {
}

function onDragEnd(e) {
    console.log('Drag end.');
    e.currentTarget.classList.remove('dragging');
    $('.card-container').removeClass('bg-brown')
    $('.project-card-placeholder').remove();
}

function onDropInColumn(e) {
    console.log('Drop in column.');
    console.log($(e.currentTarget).children('.card-body').children('.card-container'));

    let id = e.dataTransfer.getData("text");
    let draggedElement = $(`#${id}`);
    console.log(draggedElement);
    $(e.currentTarget).children('.card-body').children('.card-container').append(draggedElement);
}

function onDropBeforeCard(e) {
    e.stopPropagation();
    console.log('Drop before card.');
    console.log(e.currentTarget);

    let id = e.dataTransfer.getData("text");
    let draggedElement = $(`#${id}`);

    $(e.currentTarget).before(draggedElement);
}

export function newColumn(e) {
    let boardForm = new FormData(document.getElementById('new-board-form'))
    dataHandler.createNewBoard(boardForm, function (board) {
        dom.loadBoard(board)
    });
    $(`#addBoard`).modal('hide');
}
