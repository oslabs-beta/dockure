const express = require('express');
const conController = require('../controllers/dContainer.js');
const containerRouter = express.Router();


//get request to the api and invoke a controller that exec() and we're going to pass that as res.locals, rendeer res.locals onto /api
containerRouter.get('/', conController.getContainers, (req, res) => {
    // add conController.parseInfo
    // console.log('Inside container router, our res.locals.containers equals: ', res.locals.containers);
    console.log('entered into containerRouter within dContainer');
    const result = res.locals.containers;
    return res.status(200).send(result);
})
// 
// /api/api

module.exports = containerRouter;







