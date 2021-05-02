import React, {useState} from "react";
import {post} from 'axios';

function TimePeriodAdd(props){
    const initialState = { index: null, date: null, event: null}
    const [timePeriod, setTimePeriod] = useState(initialState)

    function handleSubmit(event) {
        event.preventDefault();
        if(!timePeriod.index || !timePeriod.date || !timePeriod.event ) return
            async function postTimePeriod() {
                try {
                    const response = await post('/api/timePeriod', timePeriod);
                    props.history.push(`/timePeriods/${response.data._id}`);
                } catch(error) {
                    console.log('error', error);
                }
            }
        postTimePeriod();
    }

    return (
        <></>
    );
}

export default TimePeriodAdd;