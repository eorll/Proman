import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

}

let newColBtn = $(".new-col")

$(newColBtn).click(function (event){
    let columnsContainer = $(this).parent().parent().siblings(".flex-nowrap:first");
    let newCardContainer = $("#inputCont")

    if (newCardContainer.length === 0 & $(this).html() === "New column"){
            columnsContainer.prepend(`
                <div class="card m-3 d-inline-block flex-nowrap bg-dark text-light border-light" id="tmpID"
                style="width: 18rem" draggable="true">
                    <div class="card-body">
                        <button class="btn btn-dark d-block w-100 my-3" draggable="false">
                            <input type="text" class="title-input" id="columnNameInput inputCont">
                         </button>
                        <hr>
                    </div>                   
                </div>`);
            $(this).html("Cancel")
    } else {
        $("#tmpID").remove()
        $(this).html("New column")
    }

    let addColumnInput = $(".title-input")
    let btn = $(this)

    addColumnInput.keypress(function(event) {
        if (event.keyCode == 13){
            let title = $(this).val()
            if (title.length > 0) {
                $(this).replaceWith(title)
                btn.html("New column")
            }
        }
    })
});

init();
