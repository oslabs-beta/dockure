const express = require('express');
const promContainerController = require('../controllers/promMetrics');
const yamlParserController = require('../controllers/ymlParser');
const metricQueriesController = require('../controllers/metricQueries');
const timeConversionController = require('../controllers/timeConversion');
const cadvisorStartController = require('../controllers/cadvisorStart');
const nodeExporter = require('../controllers/nodeExporter');
const promMetricsRouter = express.Router();


promMetricsRouter.get('/promStart', 
    promContainerController.restartProm,
    promContainerController.startProm,
    (req, res) => {
        return res.status(200).send('it worked!');
    }
);


promMetricsRouter.get('/cadvisorStart', 
    cadvisorStartController.restartCadvisor,
    cadvisorStartController.startCadvisor,
    (req, res) => {
        return res.status(200).send('it worked!');
    }
);

promMetricsRouter.get('/',
    timeConversionController.unixTime,
    metricQueriesController.getMetrics,
    (req, res) => {
        return res.status(200).json(res.locals.values);
    }
)

//route for node-exporter
promMetricsRouter.get('/node-exporter', 
    
    nodeExporter.check,
    nodeExporter.check,
    nodeExporter.restart,
    nodeExporter.start,
    (req, res) => {
        return res.status(200).send('Node-exporter worked');
    }
)

module.exports = promMetricsRouter;