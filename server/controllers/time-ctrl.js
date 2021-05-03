const TimePeriod = require('../models/time-model')

createTimePeriod = (req, res) => {
    const body = req.body

    //Error Handling.
    if(!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a time period',
        })
    }

    const timePeriod = new TimePeriod(body)

    //More Error Handling.
    if(!timePeriod){
        return res.status(400).json({ success: false, error: err })
    }

    timePeriod.save().then(() => {
        return res.status(201).json({
            success: true,
            id: timePeriod._id,
            message: 'time period created!'
        })
    })

    //Also Error Handling.
    .catch(error => {
        return res.status(400).json({
            error, message: 'time period not created'
        })
    })
}

updateTimePeriod = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    TimePeriod.findOne({ _id: req.params.id }, (err, timePeriod) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Time period not found!',
            })
        }
       timePeriod.index = body.index
       timePeriod.date = body.date
       timePeriod.event = body.event

        timePeriod.save().then(() => {
                return res.status(200).json({
                    success: true,
                    id: time_period._id,
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

getTimePeriods = async (req, res) => {
    await TimePeriod.find({}, (err, timePeriods) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!timePeriods.length) {
            return res
                .status(404)
                .json({ success: false, error: `TimePeriods not found!` })
        }
        return res.status(200).json({ success: true, data: timePeriods })
    }).catch(err => console.log(err))
}

getTimePeriodsByDate = async (req, res) => {
    await TimePeriod.find({date: req.params.date}, (err, timePeriods) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: timePeriods})
    }).catch(err => console.log(err))
}

getTimePeriodsByTask = async (req, res) => {
    await TimePeriod.find({event: req.params.event}, (err, timePeriods) => {
        if(err){
            return res.status(400).json({ success: false, error: err })
        }
        return res.status(200).json({ success: true, data: timePeriods})
    }).catch(err => console.log(err))
}

module.exports = {
    createTimePeriod,
    updateTimePeriod,
    getTimePeriods,
    getTimePeriodsByDate,
    getTimePeriodsByTask,
}