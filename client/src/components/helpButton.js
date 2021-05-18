import {Button, Image, Modal, Overlay, Tooltip} from "react-bootstrap";
import React, {useRef, useState} from "react";
import color from './images/Colors.png'
import findingFriends from './images/FindingFriends.png'
import fortnite from './images/Fortnite.png'
import addTask from './images/AddTask.png'
import addHeader from './images/AddHeader.png'

function HelpButton(){
    const target = useRef(null);
    const [pop, setPop] = useState(false);

    const togglePop = () => {
        console.log("Toggled")
        setPop(!pop);
    }

    return(
        <div>
            <Button variant="outline-dark" onClick={togglePop}>Help</Button>
            <Modal show={pop} size="xl" centered>
                <Modal.Header closeButton onClick={togglePop}>
                    <Modal.Title>
                        <h1>How to use</h1>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2><u>Adding Tasks:</u></h2>
                    Add mode allows you to create tasks.
                    First, the interface must be in add mode,
                    activated through the radio button located on the top left and indicated by the blue header.
                    <br/>
                    <Image src={addHeader} fluid width='30%' height='30%' className="border border-dark"/>
                    <br/>
                    <br/>
                    Once in Add Mode, a period of time can be selected through pressing on the appropriate cells.
                    Upon hovering over a cell, a pop-over will show what block of time it represents.
                    Don't worry if you miss click, start and end times can be changed in the task creation menu.
                    <br/>
                    <Image src={addTask} fluid width='40%' height='40%' className="border border-dark"/>
                    <br/>
                    <br/>
                    Within the menu, your selected values appear in the start and end fields, as well as an entry for the task name.
                    Here you can change your prior selection and enter in your desired task name.
                    Currently, there is not support for custom colors, however there are preset colors for specified names:
                    <Image src={color} fluid width='70%' height='70%' className="border border-dark"/>
                    <br/>
                    <br/>
                    ...Otherwise, any custom names will appear in a grey coloring.
                    <br/>
                    <Image src={fortnite} fluid width='40%' height='40%' className="border border-dark"/>
                    <br/>
                    <br/>
                    Note: If you press cells that intersect with other tasks, the other tasks will be altered or removed so that the task can be submitted
                    <br/>
                    <Image src={findingFriends} fluid width='70%' height='70%' className="border border-dark"/>
                    <br/>
                    <br/>
                    <h2><u>Editing Tasks:</u></h2>
                    Edit mode allows you to alter added tasks. In edit mode, pressing tasks activates the edit menu, which is essentially a modified
                    <em> Add Mode </em>
                    UI. Upon submission the current task will be replaced by one with the modified parameters. 
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' closeButton onClick={togglePop}>Okay</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default HelpButton
