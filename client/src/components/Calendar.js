import React, {useEffect, useState} from 'react';
// import {Link} from 'react-router-dom';
import Day from "./Day.js";
import SelectUi from "./selectUi";
import {Button, Modal} from "react-bootstrap";


function Calendar(){
    const [state, setState] = useState({selectionStart: null, selectionEnd: null});
    const [modalShow, setModalShow] = useState(false);

    const select = (cell) => {
        if(!state.selectionStart){
            setState({
                ...state,
                selectionStart: cell.state.start
            })
        }else{
            setState({
                ...state,
                selectionEnd: cell.state.end
            })
            setModalShow(true)
        }
        console.log(state);
    }

    return(
        <>
            <div className="container">
                <div className="row">
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(name => {
                        return <div className="col-lg border">{name}</div>
                    })}
                </div>
                <div className="row">
                    {[...Array(7)].map((value, index) => {
                        return <div className="col-lg border m-0 p-0"><Day cellFunc={select} index={index}/></div>
                    })}
                </div>
            </div>
            <SelectUi modalState={modalShow}
                      onHide={() => {
                          setModalShow(false)
                          setState({selectionStart: null, selectionEnd: null})
                      }}
                      selection={state}/>
        </>
    );
}

export default Calendar;