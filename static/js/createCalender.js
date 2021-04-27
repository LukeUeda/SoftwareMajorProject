class Day {
    constructor(day){
        this.container = document.createElement("div");
        this.container.setAttribute("class", "day");
        this.container.setAttribute("id", day);

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
        this.container = document.createElement("div");
        this.container.setAttribute("class", "cell");
        this.container.style.backgroundColor = "#FFFFFF";
        this.text = document.createElement("div");
        this.container.appendChild(this.text);

        this.container.addEventListener("mouseover", function(){
            console.log(this.text);
            if(document.getElementById("mode").getAttribute("class") == "highlight"){
                day.highlightEnd = number * 0.25;
            }
        });

        this.container.addEventListener("mousedown", function(){
            if(document.getElementById("mode").getAttribute("class") == "highlight"){
                document.getElementById("mode").setAttribute("class", "");
                day.highlightEnd = number * 0.25;
                console.log(day.highlightStart + "," + day.highlightEnd);
            }
            else if(document.getElementById("mode").getAttribute("class") != "highlight"){
                document.getElementById("mode").setAttribute("class", "highlight");
                day.highlightStart = number * 0.25;
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
        this.container = document.createElement("div");
        this.container.setAttribute("class", "menu");
    }
}

class WeekTitle{
    constructor(){
        this.container = document.createElement("div");
        this.container.setAttribute("class", "menu");
    }

    setTitle(name){
        this.container.innerHTML = name;
    }
}

w = new WeekNavigationContainer();
m = new Menu();
t = new WeekTitle();
t.setTitle("Yeet");

document.querySelector(".main").appendChild(m.container);
document.querySelector(".main").appendChild(t.container);
document.querySelector(".main").appendChild(w.container);
