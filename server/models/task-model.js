const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Task = new Schema(
    {
        date: { type: String, required: true},
        task: { type: String, required: true},
        start: { type: String, required: true},
        end: { type: String, required: true},
    }
);

module.exports = mongoose.model('task', Task)