import React, {useEffect, useRef, useState} from 'react';
import {Overlay, Tooltip} from "react-bootstrap";
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

    const valUpdateFunc = () => {
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
        if(props.value[0] === "School"){
            x = "#ffae00"
        }
        if(props.value[0] === "Work"){
            x = "#379e00"
        }
        if(props.value[0] === "Relax"){
            x = "#00f7ff"
        }
        if(props.value[0] === "Study"){
            x = "#ff0000"
        }
        if(props.value[0] === "Dinner"){
            x = "#adc9ff"
        }
        if(props.value[0] === "Lunch"){
            x = "#aaff7d"
        }
        if(props.value[0] === "Breakfast"){
            x = "#eeff00"
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
    }

    useEffect(valUpdateFunc, [props.value])

    useEffect(() =>{
        console.log('UPDATE')
        if(props.sel() !== null && state.start === props.sel().start){
            setState(prevState => {
                return{
                    ...prevState,
                    color: "#000000"
                }
            })
        } else {
            valUpdateFunc()
        }
    }, [props.sel])

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