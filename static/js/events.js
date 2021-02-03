import {dataHandler} from "./data_handler.js";
import {dom} from "/static/js/dom.js";
import {element} from "./elements.js";

export function initEvents() {
    initAddCard();
}

export function initEditingColumnName(obj$) {
    obj$.find('.project-status-title').on('dblclick', onDblClick);
}

export function initEditingBoardName(obj$) {
    obj$.find('.project-board-title').on('dblclick', onDblClick);
}

export function initAddColumnBtn(board$) {
    board$.find('.new-col').click(addColumn);
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

export function initDraggingElements() {
    $( ".row.flex-nowrap" ).sortable({
        tolerance: "pointer",
        opacity: 0.5,
        placeholder: "placeholder",
        start: function(e, ui){
            ui.placeholder.height(ui.item.height());
            ui.placeholder.width(ui.item.width());
            $(ui.placeholder).hide(300);

        },
        change: function (e,ui){
            $(ui.placeholder).hide().show(300);
        }
     });


    $("#boards-container").sortable({
        start: function(e, ui){
            ui.placeholder.height(ui.item.height());
            ui.placeholder.width(ui.item.width());
            $(ui.placeholder).hide(300);

        },
        change: function (e,ui){
            $(ui.placeholder).hide().show(300);
        }
    })

}

export function initRemoveParent() {
    $(".delete-parent").click(removeParent)
}

export function initHideColumns() {
    $(".hide-col").click(hideColumns)
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


function addColumn (e){
    let columnsContainer = $(this).parent().parent().siblings(".flex-nowrap:first");
    let uniqueId = `${$(e.target).attr("id").trim()}tmp`

    let colDiv = $("<div>", {
        class: "card m-3 d-inline-block flex-nowrap bg-dark text-light border-light",
        style: "width: 20%; min-width: 12rem;",
        id: uniqueId,
    });
    let deleteButton = $("<button>", {
        class: "btn btn-sm btn-danger p-1 d-flex justify-content-center align-items-center delete-parent mt-1",
        style: "width: 20px; height: 20px",
        html: "&times"
    });
    let inputText = $("<input>", {
        type: "text",
        class: "title-input",
        id: "inputCont"
    });
    let cardBody = $("<div>", {
        class: "card-body"
    });
    let hr = $("<hr>")
    let cardContainer = $("<div>",{
        class: "card-container"
    });
    let addButton = $("<button>", {
        type: "button",
        class: "btn btn-brown border-success project-add-card"
    });
    let addButtonImage = $("<img>", {
        src: "/static/icons/plus.svg",
        style: "filter: invert(); transform: scale(1.4);"
    });

    initAddCard(addButtonImage)

    let column = colDiv
        .append(deleteButton)
        .append(cardBody
            .append(inputText)
            .append(hr)
            .append(cardContainer)
            .append(addButton
                .append(addButtonImage)))

    if ($(e.target).html() === "New column"){
        columnsContainer.prepend(column);
        $(e.target).html("Cancel");
         inputText.select();
    } else {
        $("#" + uniqueId).remove();
        $(e.target).html("New column");
    }

    let btn = $(e.target);



    inputText.keypress(function(e) {
        if (e.keyCode === 13){
            let titleVal = $(e.target).val();
            let title = $("<h5>", {
                type: "text",
                class: "project-status-file column_name btn-dark d-block w-100 my-0 text-center",
                html: titleVal
            });
            if (titleVal.length > 0) {
                $(e.target).replaceWith(title);
                btn.html("New column");
                $(title).dblclick(onDblClick);
                $("#"+uniqueId).prepend(deleteButton);
                deleteButton.click(removeParent)
            }
        }
    });
}

function allowDrop(e) {
    e.preventDefault();
}

function onDragStart(e) {
    console.log('Drag start.');
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
    console.log($(e.currentTarget).find('.card-container'));

    let id = e.dataTransfer.getData("text");
    let draggedElement = $(`#${id}`);
    console.log(draggedElement);
    $(e.currentTarget).find('.card-container').append(draggedElement);
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
    let boardForm = new FormData(document.getElementById('new-board-form'));
    dataHandler.createNewBoard(boardForm, function (board) {
        dom.loadBoard(board);
    });
    $(`#addBoard`).modal('hide');
}


export function initAddCard(column$) {
    let addBtn = column$.find('.project-add-card');
    addBtn.on("click", function (e) {
        let card = {'id': -1, 'title': 'New card', 'order': -1};
        let button = element.getCard(card);
        button.children().addClass('d-none');

        let input = $('<input type="text" class="input d-inline-block w-100 border-light" placeholder="New task" value="New task">');

        button.find('h6').after(input);
        $(e.currentTarget).prev().append(button);
        applyCancelRename(button, input);
        button.on('dblclick', renameCard);
        input.select();
        input.focus();
    });
}

export function renameCard(e) {
    $(e.currentTarget).children().addClass('d-none');
    let input = $('<input type="text" class="input d-inline-block w-100 border-light"' +
        ` placeholder="New task" value="${$(e.currentTarget).find('h6').text()}">`);
    applyCancelRename($(e.currentTarget), input)
    $(e.currentTarget).find('h6').after(input);
    input.select();
    input.focus();
}

function applyCancelRename(card, input) {
    input.on('keypress', function (e) {
        // If you pressed enter
        if (e.which === 13) {
            card.children().removeClass('d-none');
            card.find('h6').text(card.find('input').val());
            card.find('input').remove();
        }
    });
    input.on('focusout', function (e) {
        card.children().removeClass('d-none');
        card.find('h6').text(card.find('input').val());
        card.find('input').remove();
    });
    $(document).on('keydown', function (e) {
        if (e.which === 27) {
            card.find('input').remove();
            card.children().removeClass('d-none');
            card.find('h1').text('New task');
        }
    });
}

function removeParent (e){
    $(e.target).parent().remove()
}


function hideColumns (e) {
    let cardBody = $(e.target).parent().siblings(".card-body")
    cardBody.toggle(500)
}