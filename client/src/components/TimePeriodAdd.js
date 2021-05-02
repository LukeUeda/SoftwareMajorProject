import React, {useState} from "react";
import {post} from 'axios';

function TimePeriodAdd(props) {
  const initialState = { index: null, date: null, event: null}
  const [timePeriod, setTimePeriod] = useState(initialState)

  function handleChange(event) {
    setTimePeriod({...timePeriod, [event.target.name]: event.target.value})
  }

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

  function handleCancel() {
    props.history.push("/timePeriods");
  }

  return (
    <></>
  );
}

export default TimePeriodAdd;