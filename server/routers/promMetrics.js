const express = require('express');
const promMetricsController = require('../controllers/promMetrics');
const promMetricsControllers = require('../controllers/promMetrics');
const promMetricsRouter = express.Router();

promMetricsRouter.get('/promStart', 
    promMetricsControllers.checkProm,
    promMetricsControllers.startProm,
    (req, res) => {
    console.log('Finished PromMetricsController');
    return res.status(200).send('it worked!');
});

module.exports = promMetricsRouter;