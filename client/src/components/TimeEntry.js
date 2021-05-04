import React, {useState} from "react";
import {Form, InputGroup, Modal} from "react-bootstrap";


function TimeEntry(props){
    const [active, setActive] = useState(false)
    const [input, setInput] = useState(props.placeholder)

    const toggle = (val) => {
        setActive(!val)
        setInput(props.placeholder);
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

export default TimeEntry;