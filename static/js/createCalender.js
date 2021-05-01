class Day {
    constructor(day){

        this.value = day

        this.container = document.createElement("div");
        this.container.setAttribute("class", "day");
        this.container.setAttribute("id", this.value);

        this.cells = []
        this.createCells(96);

        this.highlightStart = 1
        this.highlightEnd = 1
    }

    createCells(num){
        this.cells = [];
        for(var i = 0; i < num; i++){
            var cell = new Cell(i, this);
            this.cells.push(cell);
            this.container.appendChild(cell.container);
        }
    }
}

class Cell{
    constructor(number, day){
        //Set up UI
        this.container = document.createElement("div");
        this.container.setAttribute("class", "cell");
        this.container.style.backgroundColor = "#FFFFFF";

        this.container.setAttribute("data-d", day.value);
        this.container.setAttribute("data-p", number);

        //Asign values
        var text = document.createElement("div");
        text.style.position = "relative";
        text.style.left = "130%";

        //text.innerHTML = number;
        this.container.appendChild(text);

        var container = this.container;

        this.container.addEventListener("mousedown", function(){
            var mode = document.getElementById("mode")
            
            //Only able to be pressed if overlay UI is not active.
            if(mode.getAttribute("class") != "ui"){

                //If highlight mode is active, than the pressed cell is the end of the segment.
                if(mode.getAttribute("class") == "highlight"){

                    //Exit highlight mode and disable cell highlight.
                    mode.setAttribute("class", "ui");

                    //Style change;
                    container.style.border = "2px solid black";
                    container.style.borderTop = "";
                    text.innerHTML = "<" + String((number + 1) * 0.25);

                    //Set value for highlight end.
                    day.highlightEnd = (number + 1) * 0.25;
                    console.log(day.highlightStart + "," + day.highlightEnd);

                    //Activate task set menu.
                    document.getElementById("highlight_ui").style.display = "block";
                    document.getElementById("task_setter").style.display = "grid";
                }

                //If highlight mode is not active, than activate and set current cell to begining.
                else if(mode.getAttribute("class") != "highlight"){
                    mode.setAttribute("class", "highlight");
                    day.highlightStart = number * 0.25;

                    text.innerHTML = "<" + String(number * 0.25);

                    container.style.border = "2px solid black";
                    container.style.borderBottom = "";
                }
            }
        });
    }
}

class WeekNavigationContainer {
    constructor(){
        this.container = document.createElement("div");
        this.container.setAttribute("class", "container")

        //Define sections of week container;
        this.prev = document.createElement("div");
        this.prev.setAttribute("class", "prev");
        this.container.appendChild(this.prev);

        this.calender = new WeekContainer();
        this.container.appendChild(this.calender.container);

        this.next = document.createElement("div");
        this.next.setAttribute("class", "next");
        this.container.appendChild(this.next);
    }
}

class WeekContainer {
    constructor(){
        this.container = document.createElement("div");
        this.container.setAttribute("class", "calender");

        this.days = [];
        this.createDays();
    }

    createDays(){
        this.days = []
        for(var d = 0; d < 7; d++){
            var day = new Day(d);
            this.days.push(day);
            this.container.appendChild(day.container);
        }
    }
}

class Menu{
    constructor(){
        this.container = document.getElementById("menu");
    }
}

class WeekTitle{
    constructor(){
        this.container = document.createElement("div");
        this.container.setAttribute("class", "title");
    }

    setTitle(name){
        this.container.innerHTML = name;
    }
}

class HighlightUI{
    constructor(){
        var clear = document.getElementById("clear");
        var addTask = document.getElementById("task");
        var cancel = document.getElementById("cancel");

        cancel.addEventListener("mousedown", cancelFunc)
        clear.addEventListener("mousedown", clearFunc);
        addTask.addEventListener("mousedown", addTaskFunc);
    }
}

class Main{
    constructor(){
        var w = new WeekNavigationContainer();
        var m = new Menu();
        var t = new WeekTitle();
        var h = new HighlightUI();
        t.setTitle("Yeet");

        var body = document.querySelector(".main");

        body.appendChild(m.container);
        body.appendChild(t.container);
        body.appendChild(w.container);
    }
}

function clearFunc(){
    document.getElementById("highlight_ui").style.display = "none";
    document.getElementById("mode").setAttribute("class", "");
}

function addTaskFunc(){
    document.getElementById("task_setter").style.display = "none";
    document.getElementById("task_parameters").style.display = "grid";
}

function submitFunc(){
    document.getElementById("highlight_ui").style.display = "none";
    document.getElementById("mode").setAttribute("class", "");
}

function cancelFunc(){
    document.getElementById("highlight_ui").style.display = "none";
    document.getElementById("task_parameters").style.display = "none";
    document.getElementById("mode").setAttribute("class", "");
}

main = new Main();
