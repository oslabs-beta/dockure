const express = require('express');
const conController = require('../controllers/dContainer.js');
const containerRouter = express.Router();


//get request to the api and invoke a controller that exec() and we're going to pass that as res.locals, rendeer res.locals onto /api
containerRouter.get('/', conController.getContainers, (req, res) => {
    const result = res.locals.containers;
    return res.status(200).send(result);
})

containerRouter.post('/stats', conController.getStats, (req, res) => {
    const result = res.locals.data;
    return res.status(200).json(result)
})

module.exports = containerRouter;







