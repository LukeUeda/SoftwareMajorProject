import {Button, Overlay, Tooltip} from "react-bootstrap";
import React, {useRef, useState} from "react";

function HelpButton(){
    const target = useRef(null);
    const [pop, setPop] = useState(false);

    const togglePop = () => {
        console.log("Toggled")
        setPop(true);
    }

    return(
        <div>
            <Overlay target={target.current} show={pop} placement="right" transition={false}>
                {(props) => (
                    <Tooltip id="helpMenu" {...props}>
                        Yoo
                    </Tooltip>
                )}
            </Overlay>
            <Button variant="outline-dark" onClick={togglePop}>Help</Button>
        </div>
    )
}

export default HelpButton
