import React, {Component, useState} from 'react';
// import {Link} from 'react-router-dom';
import Day from "./Day.js";
import selectUi from "./selectUi";
import {Button, Modal} from "react-bootstrap";


function Calendar(){
    const [state, setState] = useState({selectionStart: null, selectionEnd: null, modalState:false});

    const select = (cell) => {
        if(!state.selectionStart){
            setState({
                ...state,
                selectionStart: cell.state.start
            })
        }else{
            setState({
                ...state,
                modalState: true,
                selectionEnd: cell.state.end
            })
        }
        console.log(state);
    }

    return(
        <>
            <div className="container">
                <div className="row">
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(name => {
                        return <div className="col-lg border">{name}</div>
                    })}
                </div>
                <div className="row">
                    {[...Array(7)].map((value, index) => {
                        return <div className="col-lg border m-0 p-0"><Day cellFunc={select} index={index}/></div>
                    })}
                </div>
            </div>
            <selectUi modalState={state.modalState}/>
            <Modal show={state.modalState}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >
                        Close
                    </Button>
                    <Button variant="primary" >
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Calendar;