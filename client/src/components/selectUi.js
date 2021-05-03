import React, {useEffect} from 'react';
import {Button, Form, InputGroup, Modal} from "react-bootstrap";
import ModalContext from "react-bootstrap/ModalContext";

// import {Link} from 'react-router-dom';

function SelectUi(props){
    useEffect(() => {
        console.log("component updated");
    });

    return (
        <>
            <Modal show={props.modalState} centered>
                <Modal.Header closeButton onClick={props.onHide}>
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                        </InputGroup.Prepend>

                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Change Time Start</InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                            placeholder={props.selection.selectionStart}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <InputGroup className="mb-3">
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox aria-label="Checkbox for following text input" />
                        </InputGroup.Prepend>

                        <InputGroup.Prepend>
                            <InputGroup.Text id="basic-addon1">Change Time End</InputGroup.Text>
                        </InputGroup.Prepend>

                        <Form.Control
                            placeholder={props.selection.selectionEnd}
                            aria-label="Username"
                            aria-describedby="basic-addon1"
                        />
                    </InputGroup>
                    <Form.Control type="taskName" placeholder="Enter Task Name" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>
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

export default SelectUi;