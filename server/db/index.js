const mongoose = require('mongoose')

const MONGODB_URI = "mongodb://root:password@portainer.elite130:32781/admin";

mongoose
    .connect(MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false })
    .catch(e => {
        console.error('Connection error', e.message)
    })

const db = mongoose.connection

module.exports = db
