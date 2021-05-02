const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TimePeriod = new Schema(
    {
        index: { type: String, required: true},
        date: { type: String, required: true},
        event: { type: String, required: true},
    }
);

module.exports = mongoose.model('time_period', TimePeriod)