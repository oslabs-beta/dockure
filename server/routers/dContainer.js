const express = require('express');
const conController = require('../controllers/dContainer.js');
const containerRouter = express.Router();
const promContainerController = require('../controllers/promMetrics');
const cadvisorStartController = require('../controllers/cadvisorStart');


//get request to the api and invoke a controller that exec() and we're going to pass that as res.locals, rendeer res.locals onto /api
containerRouter.get('/', promContainerController.restartProm,
    promContainerController.startProm,
    cadvisorStartController.restartCadvisor,
    cadvisorStartController.startCadvisor,
    conController.restartSocat,
    conController.startSocat, 
    conController.getContainers, 
    (req, res) => {
        const result = res.locals.containers;
        return res.status(200).send(result);
})

containerRouter.post('/stats', conController.getStats, (req, res) => {
    const result = res.locals.data;
    return res.status(200).json(result)
})

containerRouter.post('/start', conController.startContainer, (req, res) => {
    return res.status(res.locals.status).send(res.locals.status)
})

containerRouter.post('/stop', conController.stopContainer, (req, res) => {
    return res.status(res.locals.status).send(res.locals.status)
})

containerRouter.post('/kill', conController.killContainer, (req, res) => {
    return res.status(res.locals.status).send(res.locals.status)
})

containerRouter.post('/restart', conController.restartContainer, (req, res) => {
    return res.status(res.locals.status).send(res.locals.status)
})

containerRouter.post('/pause', conController.pauseContainer, (req, res) => {
    return res.status(res.locals.status).send(res.locals.status)
})

containerRouter.post('/resume', conController.resumeContainer, (req, res) => {
    return res.status(res.locals.status).send(res.locals.status)
})

containerRouter.post('/remove', conController.removeContainer, (req, res) => {
    return res.status(res.locals.status).send(res.locals.status)
})

module.exports = containerRouter;







