const express = require('express');
const promContainerController = require('../controllers/promMetrics');
const yamlParserController = require('../controllers/ymlParser');
const metricQueriesController = require('../controllers/metricQueries');
const timeConversionController = require('../controllers/timeConversion');
const cadvisorStartController = require('../controllers/cadvisorStart');
const nodeExporter = require('../controllers/nodeExporter');
const promMetricsRouter = express.Router();

//Nate: might need to add a starter for prom/node-exporter

//Nate: This actually might not be necessary now
promMetricsRouter.get('/promStart', 
    //can create a controller to run docker start prometheus -> run start prom if this fails
    promContainerController.restartProm,
    promContainerController.startProm,
    (req, res) => {
        console.log('Finished PromMetricsController');
        return res.status(200).send('it worked!');
    }
);

//Need a router for cadvisor that will look just like promstart
promMetricsRouter.get('/cadvisorStart', 
    //can create a controller to run docker start prometheus -> run start prom if this fails
    cadvisorStartController.restartCadvisor,
    cadvisorStartController.startCadvisor,
    (req, res) => {
        console.log('Finished PromMetricsController');
        return res.status(200).send('it worked!');
    }
);

//Nate: For speed, can define more efficient start/stop routers for starting/stopping new containers
promMetricsRouter.get('/',
    timeConversionController.unixTime,
    metricQueriesController.getMetrics,
    (req, res) => {
        console.log('Finished /metrics');
        return res.status(200).json(res.locals.values);
    }
)

promMetricsRouter.get('/node-exporter', 
    //route for node-exporter
    nodeExporter.check,
    nodeExporter.check,
    nodeExporter.restart,
    nodeExporter.start,
    (req, res) => {
        console.log('Finished setting up node-exporter');
        return res.status(200).send('Node-exporter worked');
    }
)

module.exports = promMetricsRouter;