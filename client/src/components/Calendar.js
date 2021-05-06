import React, {useEffect, useState} from 'react';
import { post } from 'axios';

// import {Link} from 'react-router-dom';
import Day from "./Day.js";
import EditUi from "./editUi";
import SelectUi from "./selectUi";
import Menu from "./Menu";


function Calendar(props){
    const initialState ={selectionStart: null, selectionEnd: null, day: null}
    const [state, setState] = useState(initialState);
    const [selection, setSelection] = useState(false);
    const [mode, setMode] = useState('Add');

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
                    day: cell.par
                })
                cell.color = "#000000"
            }else if(state.day === cell.par){
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
        async function postArticle() {
            try {
                const response = await post('/api/task', {
                    date: state.day,
                    start: bounds.start,
                    end: bounds.end,
                    task: task
                });
            } catch(error) {
                console.log('error', error);
            }
        }
        postArticle();
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
                      selection={state}
            />
        </div>
    );
}

export default Calendar;