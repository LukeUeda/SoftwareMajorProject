import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import Cell from "./Cell";
import {DBtoIndex} from "./indexToTime";

function Day(props){
    const [state, setState] = useState({
        index: props.index,
        start: '',
        end:  '',
    })

    const initialCellValues = {}
    const a = [...Array(48)].map((val, index) => {
        initialCellValues[index] = ""
    })

    const [cellValues, setCellValues] = useState(initialCellValues);

    const update = () => {
        setCellValues(initialCellValues)
        Object.entries(props.data).map((key, value) => {
            for(let x = DBtoIndex(props.data[key[0]]["start"]); x < DBtoIndex(props.data[key[0]]["end"]); x++)
            setCellValues(prevCellValues => {return {
                ...prevCellValues,
                [x]: props.data[key[0]]["task"]
            }})
        })
    }

    useEffect(() => {
        update()
    },[props.data])

    return (
        <div style={{height:"720px"}}>
            {[...Array(48)].map((value, index) => {
                    return <Cell cellFunc={props.cellFunc} index={index} par={state.index} value={cellValues[index]}/>;})}
        </div>
    );
}

export default Day;