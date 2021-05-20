import {
    ToggleButton,
    ButtonGroup,
    Button,
    Navbar,
    Nav,
    Form
} from "react-bootstrap";
import React, {useRef, useState} from "react";
import HelpButton from "./helpButton";
import Eula from "./eula";
import {DateTime} from "luxon";


function Menu(props){
    const [radioValue, setRadioValue] = useState('1');
    const [dateValue, setDateValue] = useState('');

    const radios = [ // Radio button name paired with value
        { name: 'Add', value: '1' },
        { name: 'Edit', value: '2' },
    ];

    const dataValueChange = (event) =>{ //Updates dataValues
        setDateValue(event.target.value)
    }

    const submit = () => {
        //Generates a Luxon object from string.
        const date = DateTime.fromSQL(dateValue)
        if(date.invalid === null){
            //Runs Calender.js method to skip to specified week.
            props.setNewDate(date)
        }
    }

    return (
        <>
            <Navbar bg={props.syl()} variant="dark">
                <Navbar.Brand href="#home">TimeTabler</Navbar.Brand>
                <Nav className="mr-auto">

                    <ButtonGroup toggle>
                        {radios.map((radio, idx) => (
                            <ToggleButton
                                key={idx}
                                type="radio"
                                variant="dark"
                                name="radio"
                                value={radio.value}
                                checked={radioValue === radio.value}
                                onChange={(e) => {
                                    setRadioValue(e.currentTarget.value);
                                    props.updateFunc(e.currentTarget.value);
                                }}
                            >
                                {radio.name}
                            </ToggleButton>
                        ))}
                    </ButtonGroup>

                </Nav>
                <Form inline>
                    <Form.Control type="date"
                                 value={dateValue}
                                 placeholder="yyyy-mm-dd"
                                 onChange={event => dataValueChange(event)}
                                 className="mr-sm-2"
                                 onKeyPress={event => submit(event)}
                    />

                    <Button variant="primary" onClick={submit} className="mr-sm-5">Search</Button>

                    <Eula/>
                    <HelpButton/>
                </Form>
            </Navbar>

        </>
    );
}

export default Menu