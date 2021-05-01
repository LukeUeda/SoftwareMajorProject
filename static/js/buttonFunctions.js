export function clearFunc(){
    document.getElementById("highlight_ui").style.display = "none";
    document.getElementById("mode").setAttribute("class", "");
}

export function addTaskFunc(){
    document.getElementById("task_setter").style.display = "none";
    document.getElementById("task_parameters").style.display = "grid";
}

export function submitFunc(){
    document.getElementById("highlight_ui").style.display = "none";
    document.getElementById("task_parameters").style.display = "none";
    document.getElementById("mode").setAttribute("class", "");
}

export function cancelFunc(){
    document.getElementById("highlight_ui").style.display = "none";
    document.getElementById("task_parameters").style.display = "none";
    document.getElementById("mode").setAttribute("class", "");
}