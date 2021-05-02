const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TimePeriod = new Schema(
    {
        index: { type: Number, required: true},
        date: { type: String, required: true},
        event: { type: Number, required: true},
    }
);

module.exports = mongoose.model('timePeriod', TimePeriod)