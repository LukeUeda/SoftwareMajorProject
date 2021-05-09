const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Color = new Schema(
    {
        task: { type: String, required: true},
        color: { type: String, required: true},
    }
);

module.exports = mongoose.model('color', Color)