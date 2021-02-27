class Period{
    constructor(num, activity){
        this.htmlElmnt = document.createElement("div");
        this.htmlElmnt.style.textAlign = "center";
    
        this.label = document.createElement("div");
        this.label.style.textAlign = "inline-block";
        this.label.style.fontFamily = "'Poppins', sans-serif";
        this.label.style.transform = "translate(7em,0.005em)";
    
        this.htmlElmnt.appendChild(this.label);
        let end_time = String(Math.floor((num + 1) * 0.25)) + ":" + pad(((((num+1) * 25)/100) % 1) * 60, 2);
        let start_time = String(Math.floor((num) * 0.25)) + ":" + pad(((((num+1) * 25)/100) % 1) * 60, 2);

        this.htmlElmnt.addEventListener("mouseover", function(e){
            if(e.which == 1){
                console.log(num)
            }
        });

        this.htmlElmnt.style.background = "#357AFF";
        this.htmlElmnt.style.width = "200px";
        this.htmlElmnt.style.height = "8px";
    
        this.activity = activity;
        this.num = num;
    }
}

class Day{
    //Increment specifies the duration of a single period (in minutes)

    constructor(date, increment){
        this.htmlElmnt = document.createElement("td");

        this.htmlElmnt.style.backgroundColor = "#FFFFFF";
        this.htmlElmnt.style.height = String(24 * 60/increment);
        this.htmlElmnt.style.width = "200px";
    
        document.getElementById("calendar").appendChild(this.htmlElmnt);
    
        this.date = date;
        this.increment = increment;

        //Dictionary stores period objects
        this.periods = {};
    }

    createPeriods() {
        for(var p = 0; p < 24 * 60/this.increment; p++){
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