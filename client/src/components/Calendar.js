import React, {useEffect, useState} from 'react';
import axios,{post, get} from 'axios';
import {DateTime} from 'luxon'

// import {Link} from 'react-router-dom';
import Day from "./Day.js";
import EditUi from "./editUi";
import SelectUi from "./selectUi";
import Menu from "./Menu";
import {deleteTask, getTasksByTimePeriod, postTask, getTasksByDate, updateTask} from "./databaseHandling";
import {DBtoTime, timeToDB} from "./indexToTime";
import {Button, Table} from "react-bootstrap";

function Calendar(props){
    const initialState ={selectionStart: null, selectionEnd: null, day: null, startCell: null, taskName: ``}
    const [state, setState] = useState(initialState);
    const [startDate, setStartDate] = useState(props.startDate);
    const [add, setAdd] = useState(false);
    const [mode, setMode] = useState('Add');
    const [cellData, setCellData] = useState({})

    useEffect(() => {
        var data = {};
        [0, 1, 2, 3, 4, 5, 6].forEach(d => {
            console.log('d: ', d)
            if(!cellData[startDate.plus({day: d-1}).toLocaleString('en-AU', {year: 'numeric', month: 'numeric', day: 'numeric'})]){
                data[startDate.plus({day: d-1}).toLocaleString('en-AU', {year: 'numeric', month: 'numeric', day: 'numeric'})] = [{}]
            }
        })
        setCellData({
            ...cellData,
            ...data,
        })

        console.log(startDate.toLocaleString('en-AU', {year: 'numeric', month: 'numeric', day: 'numeric'}))
    }, [startDate])
    const select = (cell, day) => {
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
                    day: day,
                    startCell: cell
                })
            }else if(state.day === day){
                if(cell.end > state.selectionStart){
                    setState({
                        ...state,
                        selectionEnd: cell.end
                    })
                }
                else{
                    setState({
                        ...state,
                        selectionEnd: state.startCell.end,
                        selectionStart: cell.start
                    })
                }

                setAdd(true)
            }
        } else if (mode === 'Edit') {
            const condition1 = t => t.start <= timeToDB(cell.start)
            const condition2 = t => t.end >= timeToDB(cell.end)

            let period = cellData[day].filter(t => condition1(t) && condition2(t))[0]
            console.log(period)
            if(period){
                setState({
                    ...state,
                    selectionStart: DBtoTime(period.start),
                    selectionEnd: DBtoTime(period.end),
                    day: day,
                    startCell: cell,
                    taskName: period.task
                })
                setAdd(true)
            }
        }
    }

    const deleteTask = () => {
        deleteCellData(timeToDB(state.startCell.start), timeToDB(state.startCell.end), state.day)
    }

    const addTask = (bounds, task) => {
        /**
         * Posts task to database
         * @param {[dictionary]} bounds <= Start and end keys represent when the task occurs.
         * @param {[string]} task <= Name of task.
         * @return {[task schema]} <= Creates entry in specified schema.
         */

        console.log(state)
        console.log(cellData)
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
                console.log(t)
                deleteCellData(t.start, t.end, day)
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

    const bgColor = () => {
        if(mode === 'Add'){
            return true
        }
        else{
            return false
        }
    }

    return(
        <div className="my-auto" style={{background: bgColor() ? '#B9D8FF' : '#FFDDB9', height:'100%'}}>
            <Menu updateFunc={switchMode} syl={() => {if(bgColor()){return 'primary'} else {return 'warning'}}}/>
            <br/>
            <Table className="table mx-auto" style={{width: '80%', display: 'grid' , gridTemplateColumns: 'repeat(auto)'}}>
                <tbody>
                    <tr>
                        <td className="d-flex align-items-center">
                            <Button type="button" className="box btn btn-dark" onClick={
                                () => {
                                    setStartDate(startDate.plus({day: -7}))
                                }
                            }
                            >Prev</Button>
                        </td>
                        {[`Sunday`,
                            `Monday`,
                            `Tuesday`,
                            `Wednesday`,
                            `Thursday`,
                            `Friday`,
                            `Saturday`].map((name, index) => {
                                var day = startDate.plus({day: index - 1}).toLocaleString('en-AU', {year: 'numeric', month: 'numeric', day: 'numeric'})
                                return (
                                    <td>
                                        <div className="border p-4 bg-dark text-light">
                                            <h2>{name.split(':')[0]}</h2>
                                            <label>{day}</label></div>
                                        <div className="border m-0 p-0"><Day cellFunc={select} date={day} data={cellData}/></div>
                                    </td>
                                )
                            })
                        }
                        <td className="d-flex align-items-center">
                            <Button type="button" className="box btn btn-dark" onClick={
                                () => {
                                    setStartDate(startDate.plus({day: 7}))
                                    console.log(cellData)
                                }
                            }
                            >Next</Button>
                        </td>
                    </tr>
                </tbody>
            </Table>
            <SelectUi modalState={add}
                      onHide={
                          () => {
                              setState(initialState)
                              setAdd(false)
                          }
                      }
                      submit={addTask}
                      delete={deleteTask}
                      selection={state}
            />
        </div>
    );
}

export default Calendar;