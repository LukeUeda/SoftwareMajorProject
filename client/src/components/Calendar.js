import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Loader from "./Loader";
import Day from "./Day.js";
import HighlightUI from "./highlightUI.js";
import TaskParameterUI from "./TaskParameterUI";
import ArticleList from "./ArticleList";

class Calendar extends Component {

    constructor() {
        super();
        this.state = {

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
                            return <div className="col-lg border m-0 p-0"><Day val={index}></Day></div>
                        })}
                    </div>
                </div>
                <HighlightUI></HighlightUI>
                <TaskParameterUI></TaskParameterUI>
                <ArticleList />
            </>
        );

    }
}

export default Calendar;