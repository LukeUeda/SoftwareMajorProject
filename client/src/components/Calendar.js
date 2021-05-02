import React, {Component} from 'react';
// import {Link} from 'react-router-dom';
import Loader from "./Loader";
import Day from "./Day.js";
import HighlightUI from "./highlightUI.js";
import TaskParameterUI from "./TaskParameterUI.js";
import ArticleList from "./ArticleList.js";
import TimePeriodAdd from "./TimePeriodAdd.js";
import {post} from "axios";

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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.submit){
            console.log(this.state)
            var timePeriod = {
                index: this.state.selectionEnd,
                date: this.state.selectionDay,
                event: this.state.selectionEvent
            }

            async function postTimePeriod() {
                try {
                    const response = await post('/api/timePeriod', timePeriod);
                    this.props.history.push(`/timePeriods/${response.data._id}`);
                } catch(error) {
                    console.log('error', error);
                }
            }
            postTimePeriod();
        }
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
                <TaskParameterUI></TaskParameterUI>
                <ArticleList />
            </>
        );

    }
}

export default Calendar;