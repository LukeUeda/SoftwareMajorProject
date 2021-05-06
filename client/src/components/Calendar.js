import React, {useEffect, useState} from 'react';

// import {Link} from 'react-router-dom';
import Day from "./Day.js";
import EditUi from "./editUi";
import SelectUi from "./selectUi";
import Menu from "./Menu";


function Calendar(){
    const initialState ={selectionStart: null, selectionEnd: null}
    const [state, setState] = useState(initialState);
    const [selection, setSelection] = useState(false);

    const select = (cell) => {
        if(state.selectionStart === null){
            setState({
                ...state,
                selectionStart: cell.state.start
            })
        }else{
            setState({
                ...state,
                selectionEnd: cell.state.end
            })
            setSelection(true)
        }
    }

    const addTask = (bounds, task) => {
        console.log("Calender State:", state)
        console.log("UI State:", bounds, task)
    }

    return(
        <div className="bg-light">
            <Menu></Menu>
            <br/>
            <div className="container">
                <div className="row">
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(name => {
                        return <div className="col-lg border bg-dark text-light">{name}</div>
                    })}
                </div>
                <div className="row">
                    {[...Array(7)].map((value, index) => {
                        return <div className="col-lg border m-0 p-0"><Day cellFunc={select} index={index}/></div>
                    })}
                </div>
            </div>
            <SelectUi modalState={selection}
                      onHide={() => {
                          setState(initialState)
                          setSelection(false)
                      }}
                      submit={addTask}
                      selection={state}/>
        </div>
    );
}

export default Calendar;