import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Loader from "./Loader";
import Day from "./Day.js";
import HighlightUI from "./highlightUI.js";
import TimePeriodAdd from "./TimePeriodAdd.js";

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectionDay: null,
            sectionStart: null,
            sectionEnd: null,
            selectionEvent: null,
            submit: false,
        };
    };

    render() {
        return(
            <>
                <div className="container">
                    <div className="row">
                        {["Sunday", "Monday", "Tuesday", "Wednesday", "Thrusday", "Friday", "Saturday"].map(name => {
                            return <div className="col-lg border">{name}</div>
                        })}
                    </div>
                    <div className="row">
                        {[...Array(7)].map((value, index) => {
                            return <div className="col-lg border m-0 p-0"><Day parent={this} index={index}></Day></div>
                        })}
                    </div>
                </div>
                <HighlightUI parent={this}></HighlightUI>
            </>
        );

    }
}

export default Calendar;