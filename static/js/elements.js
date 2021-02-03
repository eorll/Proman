export let element = {
    getBoard: function (board) {
        let newBoard = $('<div>', {
            class: 'card bg-dark border-success my-3 project-boards',
            draggable: 'true',
            id: `board-${board.id}`
        });
        newBoard.html(`
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
                               id="newCol ${board.id}">New column</a>
                        </div>
                    </div>
                    <div class="row flex-nowrap overflow-auto me-0 project-col-container">
                    </div>
                </div>
            </div>
        `);
        return newBoard
    },

    getColumn: function (status, boardId) {
        let newColumn = $('<div>', {
            class: 'card m-3 d-inline-block flex-nowrap bg-dark ' +
                'text-light border-light project-column',
            style: "width: 20%; min-width: 12rem;",
            draggable: 'true'
        });
        newColumn.html(`
            <div class="card-body">
                <h5 type="text" class="project-status-title column_name btn-dark d-block w-100 my-0 text-center"
                    draggable="false">${status}</h5>
                <hr>
                <div class="card-container" id="card-box-${status.split(" ").join("")}-${boardId}"></div> 
                       <button type="button" class="btn btn-brown border-success my-3">   
                       <img src="/static/icons/plus.svg" style="filter: invert(); transform: scale(1.4);">  
                       </img>  
                       </button>
                </div>
            </div>
        `);
        return newColumn
    },

    getCard: function (card) {
        let newCard = $('<button>');
        newCard.addClass('btn btn-primary d-block w-100 my-3 project-card');
        newCard.attr('type', 'button');
        newCard.attr('draggable', 'true');
        newCard.attr('id', `card${card.id}`);
        newCard.html(`
            <span class="btn btn-sm btn-danger p-1 d-inline-flex justify-content-center align-items-center delete-parent" style="width: 15px; height: 15px">&times;</span>
            <h6 class="d-inline me-auto">${card.title}</h6>
            <span class="badge rounded-pill bg-secondary float-end">${card.order}</span>
            <span class="visually-hidden">unread messages</span>
        `);
        return newCard
    },
}
