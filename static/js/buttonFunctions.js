function clear(){
    console.log("clear");
}

function addTask(){
    console.log("Add Task");
}

var clear = document.querySelector(".clear");
clear.addEventListener("onmousedown", clear);