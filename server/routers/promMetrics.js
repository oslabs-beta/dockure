const express = require('express');
const promContainerController = require('../controllers/promMetrics');
const yamlParserController = require('../controllers/ymlParser');
const metricQueriesController = require('../controllers/metricQueries');
const timeConversionController = require('../controllers/timeConversion');
const nodeExporter = require('../controllers/nodeExporter');
const promMetricsRouter = express.Router();

//Nate: might need to add a starter for prom/node-exporter

//Nate: This actually might not be necessary now
promMetricsRouter.get('/promStart', 
    //can create a controller to run docker start prometheus -> run start prom if this fails

    promContainerController.restartProm,
    promContainerController.startProm,

    // promContainerController.checkProm,
    // promContainerController.killProm,
    // promContainerController.checkProm,
    // promContainerController.deleteProm,
    // 
    (req, res) => {
        console.log('Finished PromMetricsController');
        return res.status(200).send('it worked!');
    }
);


//no longer need /yamlparser
// promMetricsRouter.get('/yamlParse',
//find the ports that are live and put them in the yaml file - not needed anymore
    // yamlParserController.findPorts,
    // yamlParserController.portParser,
    // yamlParserController.yamlConfig,
    // promContainerController.checkProm,
    // promContainerController.killProm,
    //Note 1:  using check prom twice is lazy and could be consolidated in future - no time right now
    //Note 2:  there is a bug in checkprom -> need to configure it to search for a container named prometheus instead of what it is currently doing
    // promContainerController.checkProm,
    // promContainerController.deleteProm,
    // promContainerController.startProm,
//     (req, res) => {
//         console.log('Finished /yamlParse');
//         return res.status(200).send('yml finished');
//     }
// )

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