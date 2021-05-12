import React, {useState, useEffect, createRef, useRef} from 'react';
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
    const feild = useRef(null);

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
        bounds.start = props.selection.selectionStart
        bounds.end = props.selection.selectionEnd
        setTask(props.selection.taskName)

        if(props.selection.taskName){

        }else{
            if(props.modalState){
                feild.current.focus()
            }
        }

    }, [props.modalState])

    const validation = () => {
        const startList = bounds.start.split(':');
        const endList = bounds.end.split(':');

        console.log(endList, startList)

        const VarTypeStart =
            startList.length === 2 &&
            !isNaN(startList[0]) &&
            !isNaN(startList[1]);

        const VarTypeEnd =
            endList.length === 2 &&
            !isNaN(endList[0]) &&
            !isNaN(endList[1]);

        const startVal = parseInt(startList[0]) + parseInt(startList[1]) * 0.01
        const endVal = parseInt(endList[0]) + parseInt(endList[1]) * 0.01

        const inBoundsStart = (startVal <= 24) && (startVal >= 0);
        const inBoundsEnd = (endVal <= 24) && (endVal >= 0);

        const correctOrder = (endVal > startVal);

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

    const renderDeleteButton = () => {
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

    const submitText = () => {
        if(props.selection.taskName !== ``) {
            return `Edit`
        }else{
            return `Submit`
        }
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
                    <Modal.Title>Add Task</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <TimeEntry title="Change Time Start" placeholder={props.selection.selectionStart} returnFunc={selection}/>
                    <Alert variant="danger" style={{display: errMsgs.varType.start ? 'block' : 'none' }}>Time is not in the correct form (hh:mm).</Alert>
                    <Alert variant="danger" style={{display: errMsgs.inBounds.start ? 'block' : 'none' }}>Time out of bounds.</Alert>
                    <TimeEntry title="Change Time End" placeholder={props.selection.selectionEnd} returnFunc={selection}/>
                    <Alert variant="danger" style={{display: errMsgs.varType.end ? 'block' : 'none' }}>Time is not in the correct form (hh:mm).</Alert>
                    <Alert variant="danger" style={{display: errMsgs.inBounds.end ? 'block' : 'none' }}>Time out of bounds.</Alert>
                    <Alert variant="danger" style={{display: errMsgs.correctOrder ? 'block' : 'none' }}>You can't end earlier than you started!</Alert>
                    <Form.Control type="taskName"
                                  placeholder="Enter Task Name (Max 20 characters)"
                                  value={task}
                                  ref={feild}
                                  onChange={(event) => {
                                      if(event.target.value.length < 20){setTask(event.target.value);}
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
                                if(props.selection.taskName !== ``){
                                    props.delete()
                                }
                                if(validation()){
                                    props.submit(bounds, task);
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