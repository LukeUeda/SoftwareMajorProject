import axios, {get, post} from "axios";
import {timeToDB} from "./indexToTime";

async function postTask(bounds, task, day) {
    try {
        const response = await post('/api/task', {
            date: day,
            start: timeToDB(bounds.start),
            end: timeToDB(bounds.end),
            task: task
        });
    } catch(error) {
        console.log('error', error);
    }
}

async function getTasksByTimePeriod(date, timePeriod) {
    try {
        const response = await get(`/api/tasks/period/${date}/${timePeriod.start}/${timePeriod.end}`);
        return(response.data)
    } catch(error) {
        console.log('error', error);
    }
}

async function deleteTask(id){
    await axios.delete(`/api/task/delete/${id}`)
}

async function getTasksByDate(date) {
    try {
        const response = await get(`/api/tasks/date/${date}`);
        return(response.data)
    } catch(error) {
        console.log('error', error);
    }
}

export {
    postTask,
    getTasksByTimePeriod,
    deleteTask,
    getTasksByDate
}