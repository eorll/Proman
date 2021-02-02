import {dom} from "./dom.js";
import {initEvents} from "./events.js";

// This function is to initialize the application
function init() {
    // init data
    // loads the boards to the screen
    dom.init();
    dom.initEventAddBoardBtn();
}

init();
