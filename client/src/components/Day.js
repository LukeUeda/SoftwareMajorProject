import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import Cell from "./Cell";
import {DBtoIndex} from "./indexToTime";

function Day(props){
    const initialCellValues = {};
    [...Array(48)].map((val, index) => {
        initialCellValues[index] = ["", false, ``]
    })

    const [cellValues, setCellValues] = useState(initialCellValues);

    const update = () => {
        setCellValues(initialCellValues)
        try{
            Object.entries(props.data[props.date]).map((key) => {
                const y = DBtoIndex(props.data[props.date][key[0]]["end"])
                const z = DBtoIndex(props.data[props.date][key[0]]["start"])
                const textCell = Math.floor((z + y) / 2)

                for(let x = DBtoIndex(props.data[props.date][key[0]]["start"]); x < DBtoIndex(props.data[props.date][key[0]]["end"]); x++){
                    let show = false
                    let border = `S`
                    let text = props.data[props.date][key[0]]["task"];

                    if(x === textCell){

                        show = true;
                    }

                    if(x === z){
                        border += `T`
                    }

                    if(x === y-1){
                        border += `B`
                    }

                    setCellValues(prevCellValues => {
                        return {
                            ...prevCellValues,
                            [x]: [text, show, border]
                        }
                    })
                }
            })
        }catch{

        }
    }

    useEffect(() => {
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