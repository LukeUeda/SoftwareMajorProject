import React, {useEffect, useState} from 'react';

// import {Link} from 'react-router-dom';
import Day from "./Day.js";
import SelectUi from "./selectUi";
import ScheduleUi from "./scheduleUi";
import Menu from "./Menu";
import {DBtoTime, timeToDB} from "./indexToTime";
import {Button, Card, Carousel, ListGroup, ListGroupItem, Table} from "react-bootstrap";

function Calendar(props){
    const initialState ={selectionStart: null, selectionEnd: null, day: null, startCell: null, taskName: ``}
    const [state, setState] = useState(initialState);
    const [startDate, setStartDate] = useState(props.startDate);
    const [add, setAdd] = useState(false);
    const [schedule, setSchedule] = useState(false);
    const [mode, setMode] = useState('Add');
    const [cellData, setCellData] = useState({});

    useEffect(() => {
        let data = {};
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
            if(state.selectionStart === null || state.day !== day){
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
        } else {
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
                if (mode === 'Edit') {
                    setAdd(true)
                }

                else if (mode === 'Schedule') {
                    console.log('Schedule')
                    setSchedule(true)
                }
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
            case '3':
                setMode('Schedule');
                break;
        }
        onHideReset()
    }

    const onHideReset = () => {
        setState(initialState)
        setSchedule(false)
        setAdd(false)
    }

    return(
        <>
            <Menu updateFunc={switchMode}
                  thisWeek={() => {setStartDate(props.startDate)}}
                  syl={
                      () => {
                          if(mode === 'Add'){
                              return 'primary'
                          } else if(mode === 'Edit'){
                              return 'warning'
                          } else{
                              return 'success'
                          }
                      }
                  }/>
            <div className="row justify-content-center" style={{height:'100%'}}>
                <div className="col-auto">
                    <br/>
                    <Table className="table mx-auto">
                        <tbody className="mx-auto">
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
                                `Saturday`].map(
                                (name, index) => {
                                    let day = startDate.plus({day: index - 1}).toLocaleString('en-AU', {year: 'numeric', month: 'numeric', day: 'numeric'})
                                    return (
                                        <td>
                                            <div className="border p-4 bg-dark text-light">
                                                <h2>
                                                    {name}
                                                </h2>
                                                <label>
                                                    {day}
                                                </label>
                                            </div>
                                            <div className="border m-0 p-0">
                                                <Day cellFunc={select}
                                                     date={day}
                                                     startSelection={
                                                         [state.startCell, state.day]
                                                     }
                                                     data={cellData}/>
                                            </div>
                                        </td>
                                    )
                                }
                            )
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
                </div>
                <SelectUi modalState={add}
                          onHide={onHideReset}
                          submit={addTask}
                          delete={deleteTask}
                          selection={state}
                          text={mode}
                />
                <ScheduleUi modalState={schedule}
                            onHide={onHideReset}
                />
            </div>
        </>
    );
}

export default Calendar;