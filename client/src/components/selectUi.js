import React, {useEffect, useState} from 'react';
import {Button, Form, InputGroup, Modal} from "react-bootstrap";

// import {Link} from 'react-router-dom';

function TimeEntry(props){
    const [active, setActive] = useState(false)
    const [input, setInput] = useState(props.placeholder)

    const toggle = (val) => {
        setActive(!val)
        setInput(props.placeholder)
    }

    return(
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Checkbox checked={active} onChange={() =>{toggle(active)}}/>
            </InputGroup.Prepend>

            <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">{props.title}</InputGroup.Text>
            </InputGroup.Prepend>

            <Form.Control
                readOnly={!active}
                value={input}
                onChange={(event) => {
                    setInput(event.target.value);
                    props.returnFunc(props.title, event.target.value)
                }}
                aria-label="Username"
                aria-describedby="basic-addon1"
            />
        </InputGroup>
    )
}

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
                    <TimeEntry title="Change Time Start" placeholder={props.selection.selectionStart} returnFunc={selection}/>
                    <TimeEntry title="Change Time End" placeholder={props.selection.selectionEnd} returnFunc={selection}/>
                    <Form.Control type="taskName"
                                  placeholder="Enter Task Name"
                                  onChange={(event) => {
                                      setTask(event.target.value);
                                      console.log(task)
                                  }}/>
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