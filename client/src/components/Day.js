import React, {Component, useState} from 'react';
// import {Link} from 'react-router-dom';
import Cell from "./Cell";
import {get} from "axios";

function Day(props){
    const [state, setState] = useState({
        index: props.index,
        start: '',
        end:  '',
    })

    const getData = async () => {
        try {
            const response = await get(`/api/tasks/date/${state.index}/`);
            console.log(response.data);
        } catch (error) {
        console.log('error', error);
        }
    }

    return (
        <div style={{height:"720px"}}>
            {[...Array(48)].map((value, index) => {
                    return <Cell cellFunc={props.cellFunc} index={index} par={state.index}/>;})}
        </div>
    );
}

export default Day;