import React, {useState, useEffect, useRef} from 'react';
import {Alert, Button, Col, Container, Form, Modal, Row, Table} from "react-bootstrap";
import TimeEntry from "./TimeEntry";
import {CirclePicker, SketchPicker} from "react-color";
import {DBtoIndex, timeToDB, timeToIndex} from "./indexToTime";

// import {Link} from 'react-router-dom';

function SelectUi(props){
    const initialBounds = {start: props.selection.selectionStart, end: props.selection.selectionEnd}
    const [bounds, setBounds] = useState(initialBounds);
    const [task, setTask] = useState('');
    const [color, setColor] = useState(props.selection.color)

    const initialErrMsgs = { // False for no error message, true for show error message
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
    }
    const [errMsgs, setErrMsgs] = useState(initialErrMsgs)

    const field = useRef(null); //Allows for modal to focus on field immediately on activation

    const selection = (title, value) => {
        /**
         * This function is parsed into TimeEntry React components. It is called when the time entry fields update.
         * @param {[string]} title <= Either "Change Time Start" or "Change Time End".
         * @param {[string]} value <= Time in hh:mm.
         * @returns {[none]} <= Updates Bounds.
         */
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

    useEffect(() => { // Run initially and when the modal stat changes
        //Setting own parameters to the same as calender component's
        bounds.start = props.selection.selectionStart
        bounds.end = props.selection.selectionEnd
        setTask(props.selection.taskName)

        if(!props.selection.taskName){ // Focus on the task name field if no task name is present.
            if(props.modalState){
                field.current.focus()
            }
        }

    }, [props.modalState])

    const validation = () => {
        /**
         * Validates all inputted data.
         * @returns {[boolean]} <= returns bool on whether validation was successful as well as triggering error messages.
         */
        const startList = bounds.start.split(':');
        const endList = bounds.end.split(':');

        const VarTypeStart =
            startList.length === 2 &&
            !isNaN(startList[0]) &&
            !isNaN(startList[1]) &&
            Number.isInteger(timeToIndex(bounds.start)) &&
            startList[1] < 60 && 0 <= startList[1];

        const VarTypeEnd =
            endList.length === 2 &&
            !isNaN(endList[0]) &&
            !isNaN(endList[1]) &&
            Number.isInteger(timeToIndex(bounds.end)) &&
            endList[1] < 60 && 0 <= endList[1];

        const startVal = parseInt(startList[0]) + parseInt(startList[1]) * 0.01
        const endVal = parseInt(endList[0]) + parseInt(endList[1]) * 0.01

        const inBoundsStart = (startVal <= 24) && (startVal >= 0);
        const inBoundsEnd = (endVal <= 24) && (endVal >= 0);

        const correctOrder = (endVal > startVal);

        const appropriateName = task !== ""
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

        return (finalBool)
    }

    const closeFunc = () =>{ //Function for cleaning up when modal is closing.
        props.onHide()
        setErrMsgs(initialErrMsgs)
        setColor('#DCDCDC')
        setBounds(initialBounds)
        setTask('')
    }

    const renderDeleteButton = () => {// Delete button is only rendered in edit mode.
        if(props.selection.taskName !== ``){
            return(
                <Button variant="outline-dark"
                        onClick={() => {
                            props.delete();
                            closeFunc()
                        }}>
                    Delete
                </Button>
            )
        }
    }

    const submitText = () => { // Text for the submit button changes.
        if(props.selection.taskName !== ``) {
            return `Edit`
        }else{
            return `Submit`
        }
    }

    const handleChangeComplete = (color) => { // Handling changes in the color picker.
        setColor(color.hex);
    }

    return (
        <>
            <Modal show={props.modalState} centered onKeyPress={event => {
                var code = event.keyCode || event.which;
                if(code === 13) { //13 is the enter keycode
                    if(validation()){
                        props.submit(bounds, task);
                        closeFunc()
                    }
                }
            }}>
                <Modal.Header closeButton onClick={closeFunc}>
                    <Modal.Title>{`${props.text} Task`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TimeEntry title="Change Time Start" placeholder={props.selection.selectionStart} returnFunc={selection}/>
                    <Alert variant="danger" style={{display: errMsgs.varType.start ? 'block' : 'none' }}>Time is not in the correct form (hh:mm) (30min increments).</Alert>
                    <Alert variant="danger" style={{display: errMsgs.inBounds.start ? 'block' : 'none' }}>Time out of bounds.</Alert>
                    <TimeEntry title="Change Time End" placeholder={props.selection.selectionEnd} returnFunc={selection}/>
                    <Alert variant="danger" style={{display: errMsgs.varType.end ? 'block' : 'none' }}>Time is not in the correct form (hh:mm) (30min increments).</Alert>
                    <Alert variant="danger" style={{display: errMsgs.inBounds.end ? 'block' : 'none' }}>Time out of bounds.</Alert>
                    <Alert variant="danger" style={{display: errMsgs.correctOrder ? 'block' : 'none' }}>You can't end earlier than you started!</Alert>
                    <Form.Control type="taskName"
                                  placeholder="Enter Task Name (Max 20 characters)"
                                  value={task}
                                  ref={field}
                                  onChange={(event) => {
                                      if(event.target.value.length < 20){setTask(event.target.value);} // Limiting task name to 20 characters.
                                  }}
                    />
                    <br/>
                    <Alert variant="danger" style={{display: errMsgs.appropriateName ? 'block' : 'none' }}>Please enter an acceptable task name.</Alert>
                    <br/>
                    <Container>
                        <Row>
                            <Col>
                                <CirclePicker
                                    color={color}
                                    onChangeComplete={ handleChangeComplete }
                                />
                            </Col>
                            <Col>
                                <div style={{width: '100%', height: '100%', backgroundColor: color}} className="text-center">
                                    {task}
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={closeFunc}>
                        Close
                    </Button>
                    <Button variant="success"
                            onClick={() => {
                                if(validation()){
                                    props.submit(bounds, task, color);
                                    closeFunc()
                                }
                            }}>
                        {submitText()}
                    </Button>
                    {
                        renderDeleteButton()
                    }
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default SelectUi;