import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import Cell from "./Cell";
import {DBtoIndex, indexToTime, timeToDB} from "./indexToTime";

function Day(props){
    const [state, setState] = useState({
        index: props.index,
        start: '',
        end:  '',
    })

    const initialCellValues = {}
    const a = [...Array(48)].map((val, index) => {
        initialCellValues[index] = ["", false]
    })

    const [cellValues, setCellValues] = useState(initialCellValues);

    const update = () => {
        setCellValues(initialCellValues)
        Object.entries(props.data).map((key, value) => {
            const y = DBtoIndex(props.data[key[0]]["end"])
            const z = DBtoIndex(props.data[key[0]]["start"])
            const textCell = Math.floor((z + y) / 2) - 1
            //console.log("x: ", x, " y: ", y)
            //console.log("TxtCell: ", textCell)
            for(let x = DBtoIndex(props.data[key[0]]["start"]); x < DBtoIndex(props.data[key[0]]["end"]); x++){
                let show = false
                let text = props.data[key[0]]["task"];
                if(x === textCell){
                    //console.log("here, x: ",x)
                    show = true;
                }

                setCellValues(prevCellValues => {return {
                    ...prevCellValues,
                    [x]: [text, show]
                }})
            }
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