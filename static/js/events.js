function initEvents() {
    initEditingBoardName();
    initEditingColumnName();
    initAddColumn();
    initDragCards();

    setInterval(function () {

    });
}

function initEditingColumnName() {
    $('.column_name').on('dblclick', onDblClick);
}

function initEditingBoardName() {
    $('.project-board-title').on('dblclick', onDblClick);
}

function initAddColumn() {
    $(".new-col").click(addColumn)
}

function initDragCards() {
    let columns = document.querySelectorAll('.project-column');

    for (let col of columns) {
        col.addEventListener('drop', onDropInColumn);
        col.addEventListener('dragover', allowDrop);
        // col.addEventListener('dragover', selectColumn);
        // col.addEventListener('dragleave', deselectColumn);
    }

    let cards = document.querySelectorAll('.project-card');

    for (let card of cards) {
        card.addEventListener('dragstart', onDragStart);
        card.addEventListener('dragend', onDragEnd);
        card.addEventListener('drag', onDrag);

        card.addEventListener('dragover', allowDrop);
        card.addEventListener('drop', onDropBeforeCard);
        // card.addEventListener('dragover', onCardDragOver);
        // card.addEventListener('dragleave', onCardDragLeave);
    }
}

function onDblClick(e) {

    let input = $('<input>');
    input.attr('type', 'text');

    if (!$(e.target).hasClass('project-board-title')) {
        input.addClass('input d-inline-block bg-transparent text-light border-0 my-0 text-center w-100');
    } else {
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
    console.log($(e.currentTarget).children('.card-container'));

    let id = e.dataTransfer.getData("text");
    let draggedElement = $(`#${id}`);
    console.log(draggedElement);
    $(e.currentTarget).children('.card-container').append(draggedElement);
}

function onDropBeforeCard(e) {
    e.stopPropagation();
    console.log('Drop before card.');
    console.log(e.currentTarget);

    let id = e.dataTransfer.getData("text");
    let draggedElement = $(`#${id}`);

    $(e.currentTarget).before(draggedElement);
}

function onCardDragOver(e) {
    e.stopPropagation();
    console.log('Card drag over.');
    // Remove previous placeholder if exist
    // $('.project-card-placeholder').remove();
    $(e.currentTarget).parent('.card-container').addClass('bg-brown');
    // $(e.currentTarget).parent('.card-container').addClass('border border-1 border-success');

    // Add new placeholder in new position
    // let placeholder = $('<hr>');
    // placeholder.addClass('d-block w-100 my-3 project-card-placeholder text-success my-1');
    // placeholder.css('border: 2 solid');
    // console.log($(e.currentTarget));
    // $(e.currentTarget).before(placeholder);
}

function onCardDragLeave() {
    console.log('Card drag leave.');
    $(e.currentTarget).parent('.card-container').removeClass('bg-brown');
}

function selectColumn(e) {
    console.log('Select column.');
    // $(e.currentTarget).children('.card-container').addClass('border border-1 border-success');
    $(e.currentTarget).addClass('bg-brown');
    // Remove previous placeholder if exist
    // $('.project-card-placeholder').remove();

    // Add new placeholder in new position
    // let placeholder = $('<hr>');
    // placeholder.addClass('d-block w-100 my-3 project-card-placeholder text-success my-1');
    // placeholder.css('border: 2 solid');
    // $(e.currentTarget).children('.card-container').append(placeholder);
}

function deselectColumn(e) {
    console.log('Deselect column.');
    $(e.currentTarget).removeClass('bg-brown');
    // $(e.currentTarget).children('.card-container').removeClass('border border-1 border-success');
    // $('.project-card-placeholder').remove();
}
