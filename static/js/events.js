function initEvents() {
    initEditingBoardName();
    initEditingColumnName();
    addCard();

}

function initEditingColumnName() {
    $('.column_name').on('dblclick', onDblClick);
}

function initEditingBoardName() {
    $('.project-board-title').on('dblclick', onDblClick);
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

function addCard() {
    $(".add_card_button").on("click", function (e) {
        console.log("event on")
        let span = $("<Span>").attr({class:"card_title d-inline me-auto"});
        let button = $("<button>" ).attr({type:'button', class:'addedCard btn btn-primary d-block w-100 my-3', draggable:'true'});
        span.text("New Card");
        button.append(span);
        $(e.target).before(button);
        button.on('dblclick', onDblClick)
    });
}