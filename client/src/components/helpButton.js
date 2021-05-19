import {Badge, Button, Image, Modal, Overlay, Tooltip} from "react-bootstrap";
import React, {useState} from "react";
import calenderNavigation from './images/CalenderNavigation.png'
import colorSelection from './images/ColorSelection.png'
import findingFriends from './images/FindingFriends.png'
import addTask from './images/AddTask.png'
import editMenu from './images/EditMenu.png'
import editTask from './images/EditMode.png'
import addHeader from './images/AddHeader.png'
import prevNext from './images/PrevNext.png'

function HelpButton(){
    const [pop, setPop] = useState(false);

    const togglePop = () => {
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
                    <h2><u>New Features!</u></h2>
                    <Badge variant="danger">New</Badge> Custom Colors are now supported! You can set them through the <em>Add Task</em> menu.
                    <br/>
                    <Image src={colorSelection} fluid width='40%' height='40%' className="border border-dark"/>
                    <br/><br/>
                    <Badge variant="danger">New</Badge> A better way to navigate through the new, simple to use calender UI!
                    <br/>
                    <Image src={calenderNavigation} fluid width='30%' height='30%' className="border border-dark"/>
                    <br/><br/><br/>
                    <h2><u>Navigation:</u></h2>
                    Upon launching the software, the current week will be displayed in the UI.
                    In order to navigate throughout the year, the <em>prev</em> and <em>next</em> buttons allow you
                    to cycle through the weeks.
                    <br/>
                    <Image src={prevNext} fluid className="border border-dark"/>
                    <br/><br/><br/>
                    <h2><u>Adding Tasks:</u></h2>
                    Add mode allows you to create tasks.
                    First, the interface must be in add mode,
                    activated through the radio button located on the top left and indicated by the green header.
                    <br/>
                    <Image src={addHeader} fluid width='25%' height='25%' className="border border-dark"/>
                    <br/><br/>
                    Once in Add Mode, a period of time can be selected through pressing on the appropriate cells.
                    Upon hovering over a cell, a pop-over will show what block of time it represents.
                    Don't worry if you miss click, start and end times can be changed in the task creation menu.
                    <br/>
                    <Image src={addTask} fluid width='40%' height='40%' className="border border-dark"/>
                    <br/><br/>
                    Within the menu, your selected values appear in the start and end fields, as well as an entry for the task name.
                    Here you can change your prior selection and enter in your desired task name.
                    <br/><br/>
                    Note: If you press cells that intersect with other tasks, the other tasks will be altered or removed so that the task can be submitted.
                    <br/>
                    <Image src={findingFriends} fluid width='70%' height='70%' className="border border-dark"/>
                    <br/><br/><br/>
                    <h2><u>Editing Tasks:</u></h2>
                    Edit mode allows you to alter added tasks. First, the interface must be in edit mode,
                    activated through the radio button located on the top left and indicated by the yellow header.
                    <br/>
                    <Image src={editTask} fluid width='30%' height='30%' className="border border-dark"/>
                    <br/><br/>
                    In edit mode, pressing tasks activates the edit menu, which is essentially a modified
                    <em> Add Mode </em>
                    UI.
                    <br/>
                    <Image src={editMenu} fluid width='40%' height='40%' className="border border-dark"/>
                    <br/><br/>
                    Upon submission the current task will be replaced by one with the modified parameters.
                    Intersecting cells will be adjusted just as they did for adding tasks. I think the delete button is self explanatory.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='primary' closeButton onClick={togglePop}>Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default HelpButton
