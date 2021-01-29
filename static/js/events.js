function initEvents() {
    initEditingBoardName();
    initEditingColumnName();
    initAddColumn();
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

function onDblClick(e) {

    let input = $('<input>');
    input.attr('type', 'text');

    if(!$(e.target).hasClass('project-board-title')) {
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


function addColumn (e){
    let columnsContainer = $(this).parent().parent().siblings(".flex-nowrap:first");

    let colDiv = $("<div>", {
                class: "card m-3 d-inline-block flex-nowrap bg-dark text-light border-light",
                style: "width: 20%; min-width: 12rem;",
                id: $(e.target).attr("id") + "tmp",
                draggable: "true"

            })
    let innerDiv = $("<div>",{
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


    if ($(e.target).html() === "New column"){
        columnsContainer.prepend(column);
        $(e.target).html("Cancel");
        input.select();
    } else {
        $("#" + $(e.target).attr("id") + "tmp").remove();
        $(e.target).html("New column");
    }

    let btn = $(e.target);

    $(".title-input").keypress(function(e) {
        if (e.keyCode === 13){
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
};
