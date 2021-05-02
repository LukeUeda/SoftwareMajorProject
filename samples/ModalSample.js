import React, {useState} from 'react';
// import {Link} from 'react-router-dom';
import {Button, Modal} from "react-bootstrap";

function MyVerticallyCenteredModal({selectedOptions, ...props}) {

    // props.show = selectedOptions && selectedOptions.firstOption && selectedOptions.secondOption;

    return (

        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}


function Calendar() {
    const [modalShow, setModalShow] = useState(false);
    const [selectedOptions] = useState({
        firstOption: null,
        secondOption: null,
    });

    return (
        <>
            <Button variant="primary" onClick={() => setModalShow(true)}>
                Launch vertically centered modal
            </Button>

            <MyVerticallyCenteredModal
                selectedOptions={selectedOptions}
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </>
    );
}

export default Calendar;
