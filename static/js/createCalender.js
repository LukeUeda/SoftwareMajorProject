function Period(num, activity){
    this.htmlElmnt = document.createElement("div");
    this.htmlElmnt.style.textAlign = "center";

    this.label = document.createElement("div");
    this.label.style.textAlign = "inline-block";
    this.label.style.fontFamily = "'Poppins', sans-serif";
    this.label.style.transform = "translate(7em,0.005em)";

    this.htmlElmnt.appendChild(this.label);
    let name = String(Math.floor((num + 1) * 0.25)) + ":" + pad(((((num+1) * 25)/100) % 1) * 60, 2);

    this.htmlElmnt.addEventListener("mouseenter", function(e){
        e.target.style.boxShadow = "inset 0 0 10px rgba(0,0,0,0.2)";
        e.target.children[0].innerHTML = "<   " + name;
        e.target.children[0].style.transition = "1s ease-in-out";
        e.target.children[0].setAttribute("pointer-events", "none");
        e.target.children[0].style.transform = "translate(8em,0.005em)";
    });

    this.htmlElmnt.addEventListener("mouseleave", function(e){
        console.log("hover");
        e.target.style.boxShadow = "";
        e.target.children[0].style.transform = "translate(7em,0.005em)";
        e.target.children[0].innerHTML = "";
    });

    this.htmlElmnt.style.background = "#f3f0f1";
    this.htmlElmnt.style.width = "200px";
    this.htmlElmnt.style.height = "8px";

    this.activity = activity;
}

function Day(date, increment){
    //Increment specifies the duration of a single period (in minutes)

    this.htmlElmnt = document.createElement("div");

    this.htmlElmnt.style.backgroundColor = "#FFFFFF";
    this.htmlElmnt.style.height = String(24 * 60/increment);
    this.htmlElmnt.style.width = "200px";

    document.getElementById("calendar").appendChild(this.htmlElmnt);

    this.date = date;
    this.increment = increment;
    //Dictionary stores period objects
    this.periods = {};

    //Generate initial periods
    this.createPeriods = function(){
        for(p = 0; p < 24 * 60/increment; p++){
            this.periods[p] = new Period(p, "Free");
            this.htmlElmnt.appendChild(this.periods[p].htmlElmnt);
        }
    }
}

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
  }

document.getElementById("calendar").style.alignItems = "centre";

var day = new Day(20, 15);
day.createPeriods();