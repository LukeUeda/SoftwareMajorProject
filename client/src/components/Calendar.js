import React, {useEffect, useState} from 'react';
import Day from "./Day.js";
import SelectUi from "./selectUi";
import Menu from "./Menu";
import {DBtoTime, timeToDB} from "./indexToTime";
import {Button, Table} from "react-bootstrap";

function Calendar(props){
    const initialState ={selectionStart: null, selectionEnd: null, day: null, startCell: null, taskName: ``, color: '#DCDCDC'}
    const [state, setState] = useState(initialState);
    const [startDate, setStartDate] = useState(props.startDate);
    const [add, setAdd] = useState(false);
    const [mode, setMode] = useState('Add');
    const [cellData, setCellData] = useState({});

    useEffect(() => {
        /**
         * Runs on initialisation and whenever the start date (first day of the displayed week) changes.
         * @param {[none]}
         * @returns {[none]} <= Function simply adds data entries if for dates if they do not exist.
         */
        let data = {};
        [0, 1, 2, 3, 4, 5, 6].forEach(
            d => {
                let date = startDate.plus({day: d-1}).toLocaleString('en-AU', {year: 'numeric', month: 'numeric', day: 'numeric'})
                if(!cellData[date]){
                    data[date] = [{}]
                }
            }
        )

        setCellData(
            {
                ...cellData,
                ...data,
            }
        )
    }, [startDate])

    const select = (cell, day) => {
        /**
         * Handles cell presses.
         * @param {[dictionary]} cell <= Start and end defines time block.
         * @param {[string]} day <= Date of the cell that was pressed.
         * @return {[none]} <= Alters state entries and activates UI.
         */
        if(mode === 'Add'){
            //If a start cell has not yet been selected OR the selected cell is on another day to the start cell...
            if(state.selectionStart === null || state.day !== day){
                //Set the selected cell to start cell.
                setState(
                    {
                        ...state,
                        selectionStart: cell.start,
                        day: day,
                        startCell: cell
                    }
                )
            //Otherwise, if the selected day is on the same day as the selected cell.
            }else if(state.day === day){
                //Store selected cell in appropriate manner
                if(cell.end > state.selectionStart){ //End cell comes after start cell.
                    setState(
                        {
                            ...state,
                            selectionEnd: cell.end
                        }
                    )
                }
                else{ //Start cell comes after end cell.
                    setState(
                        {
                        ...state,
                            selectionEnd: state.startCell.end,
                            selectionStart: cell.start
                        }
                    )
                }
                setAdd(true) //Activates interface.
            }
        } else { // If in Edit Mode.
            const condition1 = t => t.start <= timeToDB(cell.start)
            const condition2 = t => t.end >= timeToDB(cell.end)

            //Attempting to find task that surrounds the pressed cell
            let task = cellData[day].filter(t => condition1(t) && condition2(t))[0]

            if(task){ // If a task was found
                setState( // Set selection attributes
                    {
                       ...state,
                        selectionStart: DBtoTime(task.start),
                        selectionEnd: DBtoTime(task.end),
                        day: day,
                        startCell: cell,
                        taskName: task.task,
                        color: task.color
                    }
                )
                if (mode === 'Edit') {
                    setAdd(true) //Activates interface (edit mode actives since taskName is not '')
                }
            }
        }
    }

    const deleteTask = () => {
        /**
         * Function used to make XML neater.
         * @param {[none]}
         * @return {[none]} <= Simply calls other function.
         */
        deleteCellData(timeToDB(state.startCell.start), timeToDB(state.startCell.end), state.day)
    }

    const addTask = (bounds, task, color) => {
        /**
         * Posts task to database
         * @param {[dictionary]} bounds <= Start and end keys represent when the task occurs.
         * @param {[string]} task <= Name of task.
         * @param {[string]} color <= Color of task on calender display.
         * @return {[none]} <= Manipulates cellData dictionary.
         */

        adjustIntersectingCellData(timeToDB(bounds.start), timeToDB(bounds.end), state.day)
        addCellData(timeToDB(bounds.start), timeToDB(bounds.end), task, state.day, color)

        // Sets selection back to initial state.
        setState(initialState);
    }

    const addCellData = (start, stop, task, day, color) => {
        /**
         * Function simply appends entry to cellData.
         * @param {[string]} start <= When the task starts.
         * @param {[string]} end <= When the task ends.
         * @param {[string]} task <= The name of the task.
         * @param {[string]} day <= The date on which the task is set.
         * @param {[string]} color <= Color of task in calender display.
         */
        let entries = cellData[day]

        entries.splice(0,0,
            { // Adding to copy of specific day.
                start: start,
                end: stop,
                date: start,
                task: task,
                color: color
            }
        )

        setCellData(
            { // appending new day data.
                ...cellData,
                [day]: entries
            }
        )
    }

    const adjustIntersectingCellData = (start, end, day) => {
        /**
         * Finds all tasks that intersect with the period between 'start' and 'end' on the date 'day'. Afterwords,
         * these tasks are adjusted according to their configuration with respected to the parsed parameters.
         * @param {[string]} start <= Start of the time period.
         * @param {[string]} end <= End of the time period.
         * @param {[string]} day <= Date of the task.
         * @returns {[none]} <= Calls other functions that alter cellData.
         */
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
         * @returns {[none]} <= Alters cellData.
         */
              let entry = cellData[day].findIndex(t =>
                  parseFloat(t.start) <= parseFloat(timeToDB(start)) &&
                  parseFloat(t.end) >= parseFloat(timeToDB(end))
              ) // Get index of item to be deleted, which is the task that encompasses the start and end times.

              let entries = cellData[day]

              entries.splice(entry, 1) // Delete entry at identified index.

              if(entries === []){ // This stops an 'unidentified' error in Day component
                  entries = [{}]
              }

              setCellData(
                  {
                      ...cellData,
                      [day]: entries
                  }
              )
    }

    const switchMode = (num) => {
        /**
         * Changes between Add, Edit and Sleep modes.
         * @param {[string]} num <= Index of mode/button
         * @return {[none]} <= The 'mode' attribute is changed according to index.
         */
        switch (num){
            case '1':
                setMode('Add');
                break;
            case '2':
                setMode('Edit');
                break;
        }
        onHideReset()
    }

    const onHideReset = () => {
        /**
         * Function used when closing Add or Edit UI.
         * @param {[none]}
         * @return {[none]} <= Resets state and calls other function.
         */
        setState(initialState)
        setAdd(false)
    }

    const setNewDate = (date) => {
        /**
         * Function used to change the starting date of the week.
         * @param {[DateTime object]} date <= Luxon object that stores time.
         * @returns {[none]} <= sets startDate to the Sunday of the week that contains the date.
         */
        setStartDate(date.setLocale('fr-CA').startOf('week'))
    }

    return(
        <>
            <Menu updateFunc={switchMode}
                  setNewDate={setNewDate}
                  thisWeek={() => {setStartDate(props.startDate)}}
                  syl={ // Simply changing style based on mode.
                      () => {
                          if(mode === 'Add'){
                              return 'success'
                          } else if(mode === 'Edit'){
                              return 'warning'
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
                                `Saturday`]
                                .map(
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
                                                    <Day cellFunc={select} // This function is parsed all the way to Cell.
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
                          text={mode} //Used for header
                />
            </div>
        </>
    );
}

export default Calendar;