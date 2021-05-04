import React, {useState, useEffect} from 'react';
import {Alert, Button, Form, Modal} from "react-bootstrap";
import TimeEntry from "./TimeEntry";

// import {Link} from 'react-router-dom';

function SelectUi(props){
    const initialBounds = {start: props.selection.selectionStart, end: props.selection.selectionEnd}
    const [bounds, setBounds] = useState(initialBounds);
    const [task, setTask] = useState('');
    const [errMsg, setErrMsg] = useState('')

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
        let msg=''
        const correctVarType = !isNaN(bounds.end) && !isNaN(bounds.start);
        const isInBounds = (bounds.end <= 24) && (bounds.start >= 0);
        const correctOrder = (bounds.end > bounds.start);
        const appropriateName = task != ""
        const finalBool = correctVarType && isInBounds && correctOrder && appropriateName

        if (!correctVarType){
            msg += 'One of your times are not in the correct form (h.mm).<br>'
        }

            if (!isInBounds){
                msg += 'One of your times are out of bounds.<br>'
            }

            if (!correctOrder){
                msg += "You can't end earlier than you started!<br>"
            }

        if (!appropriateName){
            msg += 'Please enter an acceptable task name.<br>'
        }

        console.log(bounds, task)
        console.log(finalBool)
        setErrMsg(msg)
        return (finalBool)
    }

    return (
        <>
            <Modal show={props.modalState} centered>
                <Modal.Header closeButton onClick={props.onHide}>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <TimeEntry title="Change Time Start" placeholder={props.selection.selectionStart} returnFunc={selection}/>
                        <TimeEntry title="Change Time End" placeholder={props.selection.selectionEnd} returnFunc={selection}/>
                        <Form.Control type="taskName"
                                      placeholder="Enter Task Name"
                                      onChange={(event) => {
                                          setTask(event.target.value);
                                          console.log(task)
                                      }}
                        />
                    </div>
                    <label variant="danger">{errMsg}</label>
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