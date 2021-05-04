import React, {useState, useEffect} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import TimeEntry from "./TimeEntry";

// import {Link} from 'react-router-dom';

function SelectUi(props){
    const initialBounds = {start: props.selection.selectionStart, end: props.selection.selectionEnd}
    const [bounds, setBounds] = useState(initialBounds);
    const [task, setTask] = useState('');
    const [errMsgs, setErrMsgs] = useState({
        varType: {
            start: false,
            end: false
        },
        inBounds: {
            start: false,
            end: false
        },
        correctOrder: false,
        appropriateName: false,
    })

    const selection = (title, value) => {
        if(value !== '') {
            if (title === "Change Time Start") {
                setBounds({
                    ...bounds,
                    start: value
                })
            } else {
                setBounds({
                    ...bounds,
                    end: value
                })
            }
        }
    }

    useEffect(() => {
        console.log("I am a modal an I have been toggled")
        bounds.start = props.selection.selectionStart
        bounds.end = props.selection.selectionEnd
    }, [props.modalState])

    const validation = () => {
        const VarTypeStart = !isNaN(bounds.start);
        const VarTypeEnd = !isNaN(bounds.end);
        const inBoundsStart = (bounds.start <= 24) && (bounds.start >= 0);
        const inBoundsEnd = (bounds.end <= 24) && (bounds.end >= 0);
        const correctOrder = (bounds.end > bounds.start);
        const appropriateName = task != ""
        const finalBool = VarTypeStart && VarTypeEnd && inBoundsStart && inBoundsEnd && correctOrder && appropriateName

        if(!appropriateName){
            errMsgs.appropriateName = true;
        }

        if(!correctOrder){
            errMsgs.correctOrder = true;
        }

        if(!VarTypeStart){
            errMsgs.varType.start = true;
        }

        if(!VarTypeEnd){
            errMsgs.varType.end = true;
        }

        if(!inBoundsStart){
            errMsgs.inBounds.start = true;
        }

        if(!inBoundsEnd){
            errMsgs.inBounds.end = true;
        }

        console.log(errMsgs)
        console.log(finalBool)
        return (finalBool)
    }

    return (
        <>
            <Modal show={props.modalState} centered>
                <Modal.Header closeButton onClick={props.onHide}>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TimeEntry title="Change Time Start" placeholder={props.selection.selectionStart} returnFunc={selection}/>
                    <label style={{display: errMsgs.varType.start ? 'block' : 'none' }}>Time is not in the correct form (h.mm).</label>
                    <label style={{display: errMsgs.inBounds.start ? 'block' : 'none' }}>Time out of bounds.</label>
                    <TimeEntry title="Change Time End" placeholder={props.selection.selectionEnd} returnFunc={selection}/>
                    <label style={{display: errMsgs.varType.end ? 'block' : 'none' }}>Time is not in the correct form (h.mm).</label>
                    <label style={{display: errMsgs.inBounds.end ? 'block' : 'none' }}>Time out of bounds.</label>
                    <label style={{display: errMsgs.correctOrder ? 'block' : 'none' }}>You can't end earlier than you started!</label>
                    <Form.Control type="taskName"
                                  placeholder="Enter Task Name"
                                  onChange={(event) => {
                                      setTask(event.target.value);
                                      console.log(task)
                                  }}
                    />
                    <label style={{display: errMsgs.appropriateName ? 'block' : 'none' }}>Please enter an acceptable task name.</label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="success"
                            onClick={() => {
                                if(validation()){
                                    props.submit(bounds, task);
                                    props.onHide();
                                }
                            }}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SelectUi;