const express = require('express');
const promMetricsControllers = require('../controllers/promMetrics');
const promMetricsRouter = express.Router();

promMetricsRouter.get('/promStart', promMetricsControllers.startProm, (res, req) => {
    console.log('Finished PromMetricsController');
    // return res.status(200).send('It worked!');
})

module.exports = promMetricsRouter;