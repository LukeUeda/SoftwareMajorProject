import React, {useEffect, useState} from 'react';
import axios,{post, get} from 'axios';

// import {Link} from 'react-router-dom';
import Day from "./Day.js";
import EditUi from "./editUi";
import SelectUi from "./selectUi";
import Menu from "./Menu";
import {deleteTask, getTasksByTimePeriod, postTask, getTasksByDate} from "./databaseHandling";

function Calendar(props){
    const initialState ={selectionStart: null, selectionEnd: null, day: null}
    const [state, setState] = useState(initialState);
    const [selection, setSelection] = useState(false);
    const [mode, setMode] = useState('Add');
    const [cellData, setCellData] = useState({
        0: [{}],
        1: [{}],
        2: [{}],
        3: [{}],
        4: [{}],
        5: [{}],
        6: [{}]
    })

    useEffect(() => {
        for(let x = 0; x < 7; x++){
            getTasksByDate(x).then(response => {
                setCellData( {
                    ...cellData,
                    [x]:response.data
                })
            })
        }
    }, [])


    const select = (cell) => {
        /**
         * Handles cell presses.
         * @param {[dictionary]} cell <= Start and end defines time block.
         * @return {[state changes]} <= Cell state attributes.
         */
        if(mode === 'Add'){
            if(state.selectionStart === null){
                setState({
                    ...state,
                    selectionStart: cell.start,
                    day: cell.day
                })
            }else if(state.day === cell.day){
                setState({
                    ...state,
                    selectionEnd: cell.end
                })
                setSelection(true)
            }
        }
    }

    const addTask = (bounds, task) => {
        /**
         * Posts task to database
         * @param {[dictionary]} bounds <= Start and end keys represent when the task occurs.
         * @param {[string]} task <= Name of task.
         * @return {[task schema]} <= Creates entry in specified schema.
         */
        console.log("Calender State:", state)
        console.log("UI State:", bounds, task)

        getTasksByTimePeriod(state.day, bounds);
        //deleteTask("6095d8aa8e7f93e90d6938d9");


        postTask(bounds, task, state.day)
        getTasksByDate(state.day).then(response => {
            setCellData({
                ...cellData,
                [state.day] : response.data
            })
            console.log(cellData[state.day])
        })
    }

    const switchMode = (num) => {
        /**
         * Changes between Add, Edit and Sleep modes.
         * @param {[integer]} num <= Index of mode/button
         * @return {[string]} <= The 'mode' attribute is change according to index.
         */
        console.log(num);
        switch (num){
            case '1':
                setMode('Add');
                console.log('Add Mode Active')
                break;
            case '2':
                setMode('Edit');
                console.log('Edit Mode Active')
                break;
        }
    }

    return(
        <div className="bg-light">
            <Menu updateFunc={switchMode}></Menu>
            <br/>
            <div className="container">
                <div className="row">
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(name => {
                        return <div className="col-lg border bg-dark text-light">{name}</div>
                    })}
                </div>
                <div className="row">
                    {Object.keys(cellData).map((key,index) => {
                        return <div className="col-lg border m-0 p-0"><Day cellFunc={select} index={index} data={cellData[key]}/></div>
                        }
                    )}
                </div>
            </div>
            <SelectUi modalState={selection}
                      onHide={() => {
                          setState(initialState)
                          setSelection(false)
                      }}
                      submit={addTask}
                      selection={state}
            />
        </div>
    );
}

export default Calendar;