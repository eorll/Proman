function initEvents() {
    renameBoardName();
}

function renameBoardName() {
    $('.project-board-title').ondblclick(onDblClick);
}

function onDblClick(e) {
    console.log(e.target)
}