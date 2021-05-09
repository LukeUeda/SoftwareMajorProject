import React, {Component, useEffect, useRef, useState} from 'react';
import {Overlay, Tooltip} from "react-bootstrap";
import {indexToTime} from "./indexToTime";
// import {Link} from 'react-router-dom';

function Cell (props){
    const [state, setState] = useState({
        color: "#FFFFFF",
        start: indexToTime(props.index, 30),
        end: indexToTime(props.index + 1, 30),
        day: props.par,
        text: ""
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
        let x = "#FFFFFF"

        if(props.value[0] !== ""){
            x = "#DCDCDC"
        }
        if(props.value[0] === "Sleep"){
            x = "#D866FF"
        }
        setState(prevState => {
            return{
                ...prevState,
                color: x
            }
        })

        if(props.value[1]){
            //console.log("NOW HERE")
            setState(prevState => {
                return{
                    ...prevState,
                    text: props.value[0]
                }
            })
        }else{
            setState(prevState => {
                return{
                    ...prevState,
                    text: ""
                }
            })
        }
    }, [props.value])

    return (
        <>
            <div style={{height: '15px', backgroundColor: state.color, fontSize: '11px'}}
                 className='text-center'
                 ref={target}
                 onClick={cellFunction}
                 onMouseEnter={() => {setPop(true)}}
                 onMouseLeave={() => {setPop(false)}}
            >{state.text}</div>
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