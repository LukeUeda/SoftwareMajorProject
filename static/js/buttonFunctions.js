function clearFunc(){
    console.log("clear");
    document.getElementById("highlight_ui").style.display = "none";
}

function addTaskFunc(){
    console.log("Add Task");
}

var clear = document.getElementById("clear");
var addTask = document.getElementById("task");

addTask.addEventListener("mousedown", addTaskFunc);
clear.addEventListener("mousedown", clearFunc);