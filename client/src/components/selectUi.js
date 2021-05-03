import React, {Component} from 'react';
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

function selectUi(props){
    return (
        <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default selectUi;