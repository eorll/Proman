import { dom } from "./dom.js";

// This function is to initialize the application
function init() {
    // init data
    dom.init();
    // loads the boards to the screen
    dom.loadBoards();

}

let newColBtn = $(".card>.card-body>.container-fluid>.row>.card-header>.btn-brown")

$(newColBtn).click(function (event){
    let inputContainer = ($(this).siblings("div:first"));
    inputContainer.toggleClass("d-none");

    let columnsContainer = $(this).parent().parent().siblings(".flex-nowrap:first");

    let addColumnInput = inputContainer.children("input:first");
    let addColumnBtn = inputContainer.children("button:first");

    addColumnBtn.click(function (event){
        if (addColumnInput.val()){
            columnsContainer.append(`
            <div class="card m-3 d-inline-block flex-nowrap bg-dark text-light border-light" style="width: 18rem" draggable="true">
                <div class="card-body">
                    <button class="btn btn-dark d-block w-100 my-3" draggable="false">` + addColumnInput.val() + `</button>
                    <hr>
                </div>                   
            </div>`);
        addColumnInput.val('')
        }
    });
});

init();
