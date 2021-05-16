import {ToggleButton, ButtonGroup, Button, Navbar, Nav, Form, FormControl} from "react-bootstrap";
import React, {useState} from "react";


function Menu(props){
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Add', value: '1' },
        { name: 'Edit', value: '2' },
        { name: 'Schedule', value: '3'}
    ];

    return (
        <>
            <Navbar bg={props.syl()} variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
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
                    <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                    <Button variant="outline-dark">Search</Button>
                </Form>
            </Navbar>

        </>
    );
}

export default Menu