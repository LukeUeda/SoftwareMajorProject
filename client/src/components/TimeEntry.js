import React, {useState} from "react";
import {Form, InputGroup} from "react-bootstrap";


function TimeEntry(props){
    const [input, setInput] = useState(props.placeholder)

    return(
        <InputGroup className="mb-3">
            <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">{props.title}</InputGroup.Text>
            </InputGroup.Prepend>

            <Form.Control
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