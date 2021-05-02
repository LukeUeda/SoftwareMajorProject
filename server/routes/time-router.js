const express = require('express')

const TimePeriodCtrl = require('../controllers/time-ctrl')

const router = express.Router()

router.post('/timePeriod', TimePeriodCtrl.createTimePeriod)
router.put('/timePeriod/:id', TimePeriodCtrl.updateTimePeriod)
router.get('/timePeriods', TimePeriodCtrl.getTimePeriods)

module.exports = router