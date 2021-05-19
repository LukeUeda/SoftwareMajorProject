import React, {useEffect, useRef, useState} from 'react';
import {Overlay, Tooltip} from "react-bootstrap";
import {indexToTime} from "./indexToTime";

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
        props.cellFunc(state, props.par)
    }

    const valUpdateFunc = () => {
        /**
         * Updates style based on parsed cell data.
         */
        let border = ``

        if(props.value[0] === ""){
            border = `border border-0.5 border-secondary`
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
                color: props.value[3]
            }
        })
    }

    //Runs initially and whenever the parsed 'props.value' changes => cellData from calender.js changes.
    useEffect(valUpdateFunc, [props.value])

    useEffect(() =>{ //Runs initially and whenever the selection changes
        if(props.sel() !== null && state.start === props.sel().start){
            setState(prevState => {
                return{
                    ...prevState,
                    color: "#000000"
                }
            })
        }
        else // Important for cleaning up cells if Add or Edit UI is cancelled.
        {
            valUpdateFunc()
        }
    }, [props.sel])

    return (
        <>
            <div style={{height: '2.08%', backgroundColor: state.color, fontSize: '11px'}}
                 className={'text-center ' + state.border}
                 ref={target}
                 onClick={cellFunction}
                 onMouseEnter={() => {setPop(true)}} // Time popover activate.
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