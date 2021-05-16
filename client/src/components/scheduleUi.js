import React from 'react';
import {Modal} from "react-bootstrap";


function ScheduleUi(props){
    const closeFunc = () => {
        props.onHide();
    }

    return(
        <>
            <Modal show={props.modalState} centered>
                <Modal.Header closeButton onClick={closeFunc}>
                    <Modal.Title>
                        Set Schedule
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Yeet
                </Modal.Body>
                <Modal.Footer>
                    Footer
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ScheduleUi;