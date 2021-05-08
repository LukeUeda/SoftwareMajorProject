import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import Cell from "./Cell";
import {get} from "axios";
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
        console.log("------------------------- " + state.index + " -------------------------")
        Object.entries(props.data).map((key, value) => {
            console.log("Entry: " + key[1]["start"])
            console.log("Index: " + state.index + " Start: "  + DBtoIndex(props.data[key[0]]["start"]) + " End: "  + DBtoIndex(props.data[key[0]]["end"]));
            for(let x = DBtoIndex(props.data[key[0]]["start"]); x < DBtoIndex(props.data[key[0]]["end"]); x ++){
                initialCellValues[x] = props.data[key[0]]["task"];
            }
        })
    }

    update()

    return (
        <div style={{height:"720px"}}>
            {[...Array(48)].map((value, index) => {
                    return <Cell cellFunc={props.cellFunc} index={index} par={state.index} value={cellValues[index]}/>;})}
        </div>
    );
}

export default Day;