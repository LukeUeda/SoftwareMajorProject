const express = require('express')

const TimePeriodCtrl = require('../controllers/time-ctrl')

const router = express.Router()

router.post('/timePeriod', TimePeriodCtrl.createTimePeriod);
router.put('/timePeriod/id/:id', TimePeriodCtrl.updateTimePeriod);
router.get('/timePeriods', TimePeriodCtrl.getTimePeriods);
router.get('/timePeriods/date/:date', TimePeriodCtrl.getTimePeriodsByDate);
router.get('/timePeriods/task/:event', TimePeriodCtrl.getTimePeriodsByTask);

module.exports = router