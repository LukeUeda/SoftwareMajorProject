const express = require('express')

const Task = require('../controllers/task-ctrl')

const router = express.Router()

router.post('/task', Task.createTask);
router.put('/task/id/:id', Task.updateTask);
router.get('/tasks', Task.getTasks);

module.exports = router