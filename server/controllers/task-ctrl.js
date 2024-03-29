const Task = require('../models/task-model')

createTask = (req, res) => {
    const body = req.body
    console.log("Body:" + body)
    //Error Handling.
    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a task',
        })
    }

    const task = new Task(body)

    //More Error Handling.
    if(!task){
        return res.status(400).json({ success: false, error: err })
    }

    task.save().then(() => {
        return res.status(201).json({
            success: true,
            id: task._id,
            message: 'time period created!'
        })
    }).catch(error => {        //Also Error Handling.
            return res.status(400).json({
                error, message: 'time period not created'
            })
        })
}

updateTask = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Task.findOneAndUpdate(req.params._id, req.body, (err, task) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
    });
}

getTasks = async (req, res) => {
    await Task.find({}, (err, tasks) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!tasks.length) {
            return res
                .status(404)
                .json({ success: false, error: `Tasks not found!` })
        }
        return res.status(200).json({ success: true, data: tasks })
    }).catch(err => console.log(err))
}

deleteTask = async (req, res) => {
    await Task.deleteOne({_id: req.params.id}, (err) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(204);
    }).catch(err => console.log(err))
}

getTasksByDate = async (req, res) => {
    await Task.find({date: req.params.date}, (err,tasks) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: tasks })
    }).catch(err => console.log(err))
}

getTasksByIntersectingTimes = async (req, res) => {
    const date = req.params.date

    const start = req.params.start
    const end = req.params.end

    await Task.find({$and: [
            {$or: [
                {$and: [
                    {start: {$lt : end}},
                    {start: {$gt: start}}
                ]},
                {$and: [
                    {end: {$lt : end}},
                    {end: {$gt: start}}
                ]},
                {$and: [
                    {end: {$gt : end}},
                    {start: {$lt: start}}
                ]}
            ]},
            {
                date: date
            }
        ]}
    , (err,tasks) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: tasks })
    }).catch(err => console.log(err))
}

module.exports = {
    createTask,
    updateTask,
    getTasks,
    getTasksByDate,
    getTasksByIntersectingTimes,
    deleteTask
}