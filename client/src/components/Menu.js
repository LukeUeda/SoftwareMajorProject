import {
    ToggleButton,
    ButtonGroup,
    Button,
    Navbar,
    Nav,
    Form,
    Row,
    Col,
    Container
} from "react-bootstrap";
import React, {useState} from "react";
import HelpButton from "./helpButton";
import Eula from "./eula";
import {Route} from "react-router-dom";


function Menu(props){
    const [radioValue, setRadioValue] = useState('1');

    const radios = [
        { name: 'Add', value: '1' },
        { name: 'Edit', value: '2' },
        //{ name: 'Schedule', value: '3'}
    ];

    return (
        <>
            <Navbar bg={props.syl()} variant="dark">
                <Navbar.Brand href="#home">TimeTabler</Navbar.Brand>
                <Nav className="mr-auto">
                    <Container>
                        <Row>
                            <Col>
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
                            </Col>
                            <Col>
                                {/*<Button variant="dark" onClick={props.thisWeek}>This Week</Button>*/}
                            </Col>
                        </Row>
                    </Container>

                </Nav>
                <Form inline>
                    <Container>
                        <Row>
                            <Col>
                                <Eula/>
                            </Col>
                            <Col>
                                <HelpButton/>
                            </Col>
                        </Row>
                    </Container>

                </Form>
            </Navbar>

        </>
    );
}

export default Menu