import axios, {get, post, patch} from "axios";
import {timeToDB} from "./indexToTime";

async function postTask(entry) {
    try {
        console.log(entry)
        const response = await post('/api/task', entry);
        return(response["data"]["id"])
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
    console.log(`Deleting ${id}`)
    try {
        await axios.delete(`/api/task/delete/${id}`);
        console.log(`Deleted ${id}`);
    }
    catch(error) {
        console.log('error', error);
    }
}

async function getTasksByDate(date) {
    try {
        const response = await get(`/api/tasks/date/${date}`);
        return(response.data)
    } catch(error) {
        console.log('error', error);
    }
}

async function updateTask(task){
    try {
        await patch(`/api/task/id/${task._id}`, task);
    } catch(error) {
        console.log(error);
    }
}

export {
    postTask,
    getTasksByTimePeriod,
    deleteTask,
    getTasksByDate,
    updateTask
}