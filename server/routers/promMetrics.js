const express = require('express');
const promMetricsControllers = require('../controllers/promMetrics');
const yamlParserController = require('../controllers/ymlParser');
const promMetricsRouter = express.Router();

promMetricsRouter.get('/promStart', 
    promMetricsControllers.checkProm,
    promMetricsControllers.startProm,
    (req, res) => {
        console.log('Finished PromMetricsController');
        return res.status(200).send('it worked!');
    }
);

promMetricsRouter.get('/yamlParse',
    yamlParserController.findPorts,
    yamlParserController.portParser,
    yamlParserController.yamlConfig,
    (req, res) => {
        console.log('Finished /yamlParse');
        return res.status(200).send('yml finished');
    }
)

module.exports = promMetricsRouter;