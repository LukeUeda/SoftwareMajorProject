import React, {useEffect, useState} from 'react';
import axios,{post, get} from 'axios';

// import {Link} from 'react-router-dom';
import Day from "./Day.js";
import EditUi from "./editUi";
import SelectUi from "./selectUi";
import Menu from "./Menu";
import {deleteTask, getTasksByTimePeriod, postTask, getTasksByDate, updateTask} from "./databaseHandling";
import {timeToDB} from "./indexToTime";

function Calendar(props){
    const initialState ={selectionStart: null, selectionEnd: null, day: null}
    const [state, setState] = useState(initialState);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [mode, setMode] = useState('Add');
    const [cellData, setCellData] = useState({
        0: [{
                date: 0,
                start: '00.00',
                end: '07.00',
                task: 'Sleep'
            },
            {
                date: 0,
                start: '12.00',
                end: '15.00',
                task: 'School'
            }
        ],
        1: [{}],
        2: [{}],
        3: [{}],
        4: [{}],
        5: [{}],
        6: [{}]
    })

    // useEffect(() => {
    //     for(let x = 0; x < 7; x++){
    //         getTasksByDate(x).then(response => {
    //             setCellData(prevCellData => {return {
    //                 ...prevCellData,
    //                 [x] : response.data
    //             }})
    //         })
    //     }
    // }, [])

    useEffect(() => {
    }, [cellData])

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
                setAdd(true)
            }
        } else if (mode === 'Edit') {
            const entry = cellData[cell.date].filter(t =>
                parseFloat(t.start) <= parseFloat(timeToDB(cell.start)) &&
                parseFloat(t.end) >= parseFloat(timeToDB(cell.end))
            )

            setState({
                ...state,
                selectionStart: entry[0].start,
                selectionEnd: entry[0].end,
            })
        }
    }

    const addTask = (bounds, task) => {
        /**
         * Posts task to database
         * @param {[dictionary]} bounds <= Start and end keys represent when the task occurs.
         * @param {[string]} task <= Name of task.
         * @return {[task schema]} <= Creates entry in specified schema.
         */

        adjustIntersectingCellData(timeToDB(bounds.start), timeToDB(bounds.end), state.day)
        addCellData(timeToDB(bounds.start), timeToDB(bounds.end), task, state.day)

        setState(initialState);
    }


    const addCellData = (start, stop, task, day) => {
        let entries = cellData[day]
        entries.splice(0,0, {
                start: start,
                end: stop,
                date: start,
                task: task
            }
        )
        setCellData({
            ...cellData,
            [day]: entries
        })
    }

    const adjustIntersectingCellData = (start, end, day) => {
        const condition1 = t => start <= t.start && t.start < end
        const condition2 = t => start < t.end && t.end <= end
        const condition3 = t => t.start < start && end < t.end

        let periods = cellData[day].filter(t => condition1(t) || condition2(t) || condition3(t))

        periods.map(t => {
            if(condition1(t) && condition2(t)){
                deleteCellData(start, end, day)
            }
            else if(condition1(t)){
                deleteCellData(t.start, t.end, day)
                addCellData(end, t.end, t.task, day)
            }

            else if(condition2(t)){
                deleteCellData(t.start, t.end, day)
                addCellData(t.start, start, t.task, day)
            }

            else if(condition3(t)){
                deleteCellData(t.start, t.end, day)
                addCellData(end, t.end, t.task, day)
                addCellData(t.start, start, t.task, day)
            }
        })
    }

    const deleteCellData = (start, end, day) => {
        /**
         * Removes surrounding entry from local data.
         * @param {[string]} cell.start <= Lower bound of cell.
         * @param {[string]} cell.end <= Upper bound of cell.
         * @param {[int]} day <= Index of day within week.
         */
            let entry = cellData[day].findIndex(t =>
                parseFloat(t.start) <= parseFloat(timeToDB(start)) &&
                parseFloat(t.end) >= parseFloat(timeToDB(end))
            )

            let entries = cellData[day]

            entries.splice(entry, 1)

            if(entries === []){
                entries = [{}]
            }

            setCellData({
                ...cellData,
                [day]: entries
            })
    }

    const switchMode = (num) => {
        /**
         * Changes between Add, Edit and Sleep modes.
         * @param {[integer]} num <= Index of mode/button
         * @return {[string]} <= The 'mode' attribute is change according to index.
         */
        switch (num){
            case '1':
                setMode('Add');
                break;
            case '2':
                setMode('Edit');
                break;
        }
    }

    return(
        <div className="bg-light">
            <Menu updateFunc={switchMode}/>
            <br/>
            <div className="container">
                <div className="row">
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(name => {
                        return <div className="col-lg border bg-dark text-light">{name}</div>
                    })}
                </div>
                <div className="row">
                    {Object.keys(cellData).map((key,index) => {
                        return <div className="col-lg border m-0 p-0"><Day cellFunc={select} index={index} data={cellData}/></div>
                        }
                    )}
                </div>
            </div>
            <SelectUi modalState={add}
                      onHide={() => {
                          setState(initialState)
                          setAdd(false)
                      }}
                      submit={addTask}
                      selection={state}
            />
            {/*<EditUi modalState={add}*/}
            {/*        onHide={() => {*/}
            {/*            setState(initialState)*/}
            {/*            setAdd(false)*/}
            {/*        }}*/}
            {/*/>*/}
        </div>
    );
}

export default Calendar;