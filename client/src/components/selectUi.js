import React, {useState} from 'react';
import {Button, Form, Modal} from "react-bootstrap";
import TimeEntry from "./TimeEntry";

// import {Link} from 'react-router-dom';

function SelectUi(props){
    const initialBounds = {start: props.selection.selectionStart, end: props.selection.selectionEnd}
    const [bounds, setBounds] = useState(initialBounds);
    const [task, setTask] = useState("");

    const selection = (title, value) => {
        if(title === "Change Time Start"){
            setBounds({
                ...bounds,
                start: value
            })
        }else{
            setBounds({
                ...bounds,
                end: value
            })
        }
    }

    const submit = () => {
        if(task === ""){
            console.log("You've got no task mate")
            return;
        }

        if(bounds.start > bounds.end){
            console.log(bounds)
            console.log("Wot, you gonna have time run backwards huh?")
            return;
        }

        props.onHide();
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>
                        Close
                    </Button>
                    <Button variant="success" onClick={submit}>
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SelectUi;