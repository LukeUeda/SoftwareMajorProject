class Day {
    constructor(){
        this.container = document.createElement("div");
        this.container.setAttribute("class", "day");

        this.cells = []
        this.createCells(96);
    }

    createCells(num){
        this.cells = [];
        for(var i = 0; i < num; i++){
            var cell = new Cell();
            this.cells.push(cell);
            this.container.appendChild(cell.container);
        }
    }
}

class Cell{
    constructor(){
        this.container = document.createElement("div");
        this.container.setAttribute("class", "cell");
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
            var day = new Day();
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
