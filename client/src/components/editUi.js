import React, {useState} from 'react'
import {Container, Row, Col, Button, Form, Modal} from "react-bootstrap";
import TimeEntry from "./TimeEntry";


function EditUi(props){
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

    return(
        <>
            <Modal show={props.modalState} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={props.onHide}>
                        Cancel
                    </Button>
                    <Button variant="outline-dark" >
                        Delete
                    </Button>
                    <Button variant="success">
                        Submit
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default EditUi