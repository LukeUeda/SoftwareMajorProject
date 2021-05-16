import React, {Component, useEffect, useRef, useState} from 'react';
import {Button, Overlay, Tooltip} from "react-bootstrap";
import {indexToTime} from "./indexToTime";
// import {Link} from 'react-router-dom';

function Cell (props){
    const [state, setState] = useState({
        color: "#FFFFFF",
        border: ``,
        start: indexToTime(props.index, 30),
        end: indexToTime(props.index + 1, 30),
        text: ""
    });
    const [pop, setPop] = useState(false);
    const target = useRef(null);

    const cellFunction = () => {
        /**
         * Calls function from parent component.
         */
        // setState({
        //     ...state,
        //     color: "#AAAAAA"
        // })
        props.cellFunc(state, props.par)
    }

    useEffect(() => {
        let x = "#FFFFFF"
        let border = ``

        if(props.value[0] !== ""){
            x = "#DCDCDC"
        }else{
            border = `border border-0.5 border-secondary`
        }
        if(props.value[0] === "Sleep"){
            x = "#D866FF"
        }

        let text = ``

        if(props.value[0]){
            border = `border-dark border-left border-right`
        }
        if(props.value[1]) {
            text = props.value[0]
        }

        if(props.value[2].includes(`B`)){
            border += ' border-bottom rounded-bottom'
        }
        if(props.value[2].includes('T')){
            border += ' border-top rounded-top'
        }


        setState(prevState => {
            return{
                ...prevState,
                text: text,
                border: border,
                color: x
            }
        })
    }, [props.value])

    return (
        <>
            <div style={{height: '2.08%', backgroundColor: state.color, fontSize: '11px'}}
                 className={'text-center ' + state.border}
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