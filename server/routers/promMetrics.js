const express = require('express');
const promContainerController = require('../controllers/promMetrics');
// const promMetricsControllers = require('../controllers/promMetrics');
const yamlParserController = require('../controllers/ymlParser');
const promMetricsRouter = express.Router();

promMetricsRouter.get('/promStart', 
    promContainerController.checkProm,
    promContainerController.startProm,
    (req, res) => {
        console.log('Finished PromMetricsController');
        return res.status(200).send('it worked!');
    }
);

promMetricsRouter.get('/yamlParse',
    yamlParserController.findPorts,
    yamlParserController.portParser,
    yamlParserController.yamlConfig,
    promContainerController.checkProm,
    promContainerController.killProm,
    //Note 1:  using check prom twice is lazy and could be consolidated in future - no time right now
    //Note 2:  there is a bug in checkprom -> need to configure it to search for a container named prometheus instead of what it is currently doing
    promContainerController.checkProm,
    promContainerController.deleteProm,
    promContainerController.startProm,
    (req, res) => {
        console.log('Finished /yamlParse');
        return res.status(200).send('yml finished');
    }
)

//Nate: For speed, can define more efficient start/stop routers for starting/stopping new containers

module.exports = promMetricsRouter;