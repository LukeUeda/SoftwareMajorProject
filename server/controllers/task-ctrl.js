const Task = require('../models/task-model')

createTask = (req, res) => {
    const body = req.body

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

    Task.findOne({ _id: req.params.id }, (err, task) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Time period not found!',
            })
        }
        task.name = body.name
        task.color = body.color

        task.save().then(() => {
            return res.status(200).json({
                success: true,
                id: task._id,
                message: 'Time period updated!',
            })
        })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Time period not updated!',
                })
            })
    })
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

getTasksByDate = async (req, res) => {
    await Task.find({date: req.params.date}, (err,tasks) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        if (!tasks.length){
            return res
                .status(404)
                .json({
                    success: false, error: `Tasks not found!`
                })
        }
        return res.status(200).json({ success: true, data: tasks })
    }).catch(err => console.log(err))
}

getTasksByIntersectingTasks = async (req, res) => {
    const body = req.body



    await Task.find({date: req.params.date}, (err,tasks) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        if (!tasks.length){
            return res
                .status(404)
                .json({
                    success: false, error: `Tasks not found!`
                })
        }
        return res.status(200).json({ success: true, data: tasks })
    }).catch(err => console.log(err))
}

module.exports = {
    createTask,
    updateTask,
    getTasks,
    getTasksByDate,
}