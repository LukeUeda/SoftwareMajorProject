import {WeekNavigationContainer, WeekTitle} from './createCalender.js';
import {HighlightUI, Menu} from './ui.js';

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

new Main()