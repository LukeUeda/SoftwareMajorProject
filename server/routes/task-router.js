const express = require('express')

const Task = require('../controllers/task-ctrl')

const router = express.Router()

router.post('/task', Task.createTask);
router.patch('/task/id/:id', Task.updateTask);
router.get('/tasks', Task.getTasks);
router.get('/tasks/date/:date', Task.getTasksByDate);
router.get('/tasks/period/:date/:start/:end', Task.getTasksByIntersectingTimes);
router.delete('/task/delete/:id', Task.deleteTask);

module.exports = router