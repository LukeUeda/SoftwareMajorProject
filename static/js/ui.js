import { clearFunc, addTaskFunc, cancelFunc, submitFunc} from './buttonFunctions.js';


export class HighlightUI{
    constructor(){
        var clear = document.getElementById("clear");
        var addTask = document.getElementById("task");
        var cancel = document.getElementById("cancel");
        var submit = document.getElementById("submit");

        submit.addEventListener("mousedown", submitFunc);
        cancel.addEventListener("mousedown", cancelFunc);
        clear.addEventListener("mousedown", clearFunc);
        addTask.addEventListener("mousedown", addTaskFunc);
    }
}

export class Menu{
    constructor(){
        this.container = document.getElementById("menu");
    }
}
