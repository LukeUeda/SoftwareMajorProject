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
        const correctOrder = (parseFloat(bounds.end) > parseFloat(bounds.start));
        const appropriateName = task != ""
        const finalBool = VarTypeStart && VarTypeEnd && inBoundsStart && inBoundsEnd && correctOrder && appropriateName

        setErrMsgs({
            varType: {
                start: !VarTypeStart,
                end: !VarTypeEnd
            },
            inBounds: {
                start: !inBoundsStart && VarTypeStart,
                end: !inBoundsEnd && VarTypeEnd
            },
            correctOrder: !correctOrder && VarTypeEnd && VarTypeStart,
            appropriateName: !appropriateName
        })

        console.log(bounds)
        console.log(errMsgs)
        console.log(finalBool)
        return (finalBool)
    }

    const closeFunc = () =>{
        props.onHide()
        setBounds(initialBounds)
        setTask('')
    }


    return (
        <>
            <Modal show={props.modalState} centered>
                <Modal.Header closeButton onClick={closeFunc}>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TimeEntry title="Change Time Start" placeholder={props.selection.selectionStart} returnFunc={selection}/>
                    <Alert variant="danger" style={{display: errMsgs.varType.start ? 'block' : 'none' }}>Time is not in the correct form (h.mm).</Alert>
                    <Alert variant="danger" style={{display: errMsgs.inBounds.start ? 'block' : 'none' }}>Time out of bounds.</Alert>
                    <TimeEntry title="Change Time End" placeholder={props.selection.selectionEnd} returnFunc={selection}/>
                    <Alert variant="danger" style={{display: errMsgs.varType.end ? 'block' : 'none' }}>Time is not in the correct form (h.mm).</Alert>
                    <Alert variant="danger" style={{display: errMsgs.inBounds.end ? 'block' : 'none' }}>Time out of bounds.</Alert>
                    <Alert variant="danger" style={{display: errMsgs.correctOrder ? 'block' : 'none' }}>You can't end earlier than you started!</Alert>
                    <Form.Control type="taskName"
                                  placeholder="Enter Task Name (Max 20 characters)"
                                  value={task}
                                  onChange={(event) => {
                                      if(event.target.value.length < 20){setTask(event.target.value);}
                                      console.log(task)
                                  }}
                    />
                    <label></label>
                    <Alert variant="danger" style={{display: errMsgs.appropriateName ? 'block' : 'none' }}>Please enter an acceptable task name.</Alert>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={closeFunc}>
                        Close
                    </Button>
                    <Button variant="success"
                            onClick={() => {
                                if(validation()){
                                    props.submit(bounds, task);
                                    closeFunc()
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