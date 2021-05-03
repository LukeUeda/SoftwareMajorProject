import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Loader from "./Loader";
import Day from "./Day.js";
import HighlightUI from "./highlightUI.js";
import axios from "axios";

class Calendar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectionDay: null,
            sectionStart: null,
            sectionEnd: null,
            selectionEvent: null,
            submit: false,
            cells: [],
            date: "03042021",
        };
    };

    componentDidMount() {
        async function getCells(date) {
            try {
                const response = await axios.get("/api/timePeriods/date/"+date);
                return response.data;
            } catch(error) {
                console.log('error', error);
            }
        }
        getCells(this.state.date).then(timePeriods => {
            console.log('timePeriods', timePeriods.data);
            this.state.cells = timePeriods.data;
        });
    }

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