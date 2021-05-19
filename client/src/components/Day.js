import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import Cell from "./Cell";
import {DBtoIndex} from "./indexToTime";

function Day(props){
    const initialCellValues = {};
    [...Array(48)].map((val, index) => {
        initialCellValues[index] = ["", false, ``]
    }) // Setting up initial values.


    const [cellValues, setCellValues] = useState(initialCellValues);

    const update = () => {
        /**
         * Function updates cell data based on parsed cellData from calender.js
         */
        setCellValues(initialCellValues)
        // During initialisation, props.data[props.data] has no entries, hence a null object error occurs.
        // (try/catch used to combat this)
        try{
            Object.entries(props.data[props.date]).map((key) => {
                const y = DBtoIndex(props.data[props.date][key[0]]["end"])
                const z = DBtoIndex(props.data[props.date][key[0]]["start"])
                const textCell = Math.floor((z + y) / 2) // Approximately the centre of the task

                for(let x = DBtoIndex(props.data[props.date][key[0]]["start"]); x < DBtoIndex(props.data[props.date][key[0]]["end"]); x++){
                    let show = false // Whether or not to show text (taskName).
                    let border = `S` // Type of border arrangement.
                    let text = props.data[props.date][key[0]]["task"] // Task Name
                    let color = props.data[props.date][key[0]]["color"] // Color of task
                    console.log(x === z, y === z)
                    if(x === textCell-1 || (x === z && y - z === 1)){
                        show = true; //Show text if cell is around centre
                    }

                    if(x === z){
                        border += `T` //Top border if x is first cell
                    }

                    if(x === y-1){
                        border += `B` //Bottom border if x is last cell
                    }

                    setCellValues(prevCellValues => {
                        return {
                            ...prevCellValues,
                            [x]: [text, show, border, color]
                        }
                    })
                }
            })
        }catch{}
    }

    useEffect(() => { // Runs at initialisation and when data changes (cellData from calender.js)
        update()
    },[props.data])

    return (
        <div style={{height:"624px"}}>
            {[...Array(48)]
                .map(
                    (v, index) => {
                        return(
                            <Cell cellFunc={props.cellFunc}
                                  index={index}
                                  par={props.date}
                                  sel={
                                      () => {
                                          if(props.startSelection[1] === props.date){
                                              return props.startSelection[0]
                                          }else{
                                              return null
                                          }
                                      }
                                  }
                                  value={cellValues[index]}
                            />
                        )
                    }
                )
            }
        </div>
    );
}

export default Day;