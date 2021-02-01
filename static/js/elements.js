export let element = {
    board: function (board) {
        let newBoard = document.createElement('div');
        newBoard.innerHTML = `
        <div class="card bg-dark border-success my-3 project-boards" draggable="true" id="board ${board.id}">
    <div class="card-header">
        <h4 class="d-inline me-auto project-board-title">${board.title}</h4>
        <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split float-end d-inline"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
        </button>
    </div>
    <div class="card-body">
        <div class="container-fluid">
            <div class="row">
                <div class="card-header">
                    <h5 class="d-inline me-auto">Your columns:</h5>
                    <a href="#" class="btn btn-brown border-success float-end d-inline new-col"
                       id="newCol ${board.id}"
                    >New column</a>
                </div>
            </div>
            <div class="row flex-nowrap overflow-auto me-0" id="column-container ${board.id}">
                    
            </div>
        </div>
    </div>
</div>
`;
        return newBoard
    },

    column: function (status, boardId) {
        let newColumn = document.createElement('div');
        newColumn.className = 'card m-3 d-inline-block flex-nowrap bg-dark text-light border-light';
        newColumn.setAttribute('style', "width: 20%; min-width: 12rem;");
        newColumn.setAttribute('draggable', 'true')
        newColumn.innerHTML = `
        <div class="card-body" id="card-box ${status} ${boardId}">
        <h5 type="text" class="column_name btn-dark d-block w-100 my-0 text-center"
            draggable="false">${status}</h5>
        <hr>
                
        </div>
    </div>
`
    return newColumn
    },

    card: function (card) {
      let newCard = document.createElement('div');
      newCard.innerHTML = `
<button type="button" class="btn btn-primary d-block w-100 my-3"
        draggable="true">
    <span class="btn btn-sm btn-danger p-1 d-inline-flex justify-content-center align-items-center delete-parent" style="width: 15px; height: 15px">&times;</span>
    <h6 class="d-inline me-auto card-title">${card.title}</h6>
    <span class="badge rounded-pill bg-secondary float-end">${card.order}</span>
    <span class="visually-hidden">unread messages</span>
</button>
`
        return newCard
    },
}