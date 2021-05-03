import React, {Component, useState} from 'react';
import {post} from "axios";
import {useHistory} from "react-router-dom";
// import {Link} from 'react-router-dom';

function ModalHeader(props){
    return (
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Highlighted Section: {props.period}</h5>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    )
}

function ClearTaskSelect(props){
    const timePeriod = { index: props.parent.state.sectionEnd, date: props.parent.state.selectionDay, event: "Free"}
    let history = useHistory();

    function handleSubmit(event) {
        console.log(timePeriod)
        event.preventDefault();
        async function postTimePeriod() {
            try {
                const response = await post('/api/timePeriod', timePeriod);
                history.push(`/timePeriods/${response.data._id}`);
            } catch(error) {
            }
        }
        postTimePeriod();
    }

    return(
        <>
            <div className="modal-body">
                <label>Select Action</label>
            </div>
            <div className="modal-footer modal-dialog-centered container">
                <button className="btn btn-block btn-dark col-sm"
                    onClick={handleSubmit}>Clear</button>
                <button className="btn btn-block btn-primary col-sm"
                        data-slide="next"
                        href="#highlightUI">Add Task</button>
            </div>
        </>
    )
}

function TaskParameters(props){
    const timePeriod = { index: props.parent.state.sectionEnd, date: props.parent.state.date, event: "Free"}
    let history = useHistory();

    function handleSubmit(event) {
        console.log(timePeriod)
        event.preventDefault();
        async function postTimePeriod() {
            try {
                const response = await post('/api/timePeriod', timePeriod);
                history.push(`/timePeriods/${response.data._id}`);
            } catch(error) {
            }
        }
        postTimePeriod();
    }

    function handleInput(event) {
        timePeriod.event = event.target.value
    }

    return(
        <>
            <div className="modal-body container">
                <div className="input-group mb-3">
                    <button className="btn btn-outline-success" onClick={handleSubmit}>Submit</button>
                    <input type="text" placeholder="Task Name" onInput={handleInput} className="form-control"/>
                </div>
            </div>
        </>
    )
}

class HighlightUI extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    };

    render() {
        return (
            <div>
                <div className="modal fade"
                     id="highlightUi"
                     tabindex="-1"
                     aria-labelledby="task setter"
                     aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content carousel slide" data-interval="false" id="highlightUI">
                            <ModalHeader period={"2:30am to 6:30pm"}/>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <ClearTaskSelect parent={this.props.parent}/>
                                </div>
                                <div className="carousel-item">
                                    <TaskParameters parent={this.props.parent}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HighlightUI;