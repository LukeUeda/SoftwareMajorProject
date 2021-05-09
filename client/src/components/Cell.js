import React, {Component, useEffect, useRef, useState} from 'react';
import {Overlay, Tooltip} from "react-bootstrap";
import {indexToTime} from "./indexToTime";
// import {Link} from 'react-router-dom';

function Cell (props){
    const [state, setState] = useState({
        color: "#FFFFFF",
        start: indexToTime(props.index, 30),
        end: indexToTime(props.index + 1, 30),
        day: props.par
    });
    const [pop, setPop] = useState(false);
    const target = useRef(null);

    const cellFunction = () => {
        /**
         * Calls function from parent component.
         */
        props.cellFunc(state)
    }

    useEffect(() => {
        if(props.value === "School"){
            setState(prevState => {
                return{
                    ...prevState,
                    color: "#555500"
                }
            })
        }
    }, [props.value])

    return (
        <>
            <div style={{height: "15px", backgroundColor: state.color}}
                 ref={target}
                 onClick={cellFunction}
                 onMouseEnter={() => {setPop(true)}}
                 onMouseLeave={() => {setPop(false)}}
            >{props.value}</div>
            <Overlay target={target.current} show={pop} placement="right" transition={false}>
                {(props) => (
                    <Tooltip id="overlay-example" {...props}>
                        {state.start + " - " + state.end}
                    </Tooltip>
                )}
            </Overlay>
        </>
    );
}

export default Cell;