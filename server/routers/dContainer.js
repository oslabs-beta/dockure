const express = require('express');
const containerController = require('../controllers/dContainer.js');
const containerRouter = express.Router();


//get request to the api and invoke a controller that exec() and we're going to pass that as res.locals, rendeer res.locals onto /api
containerRouter.get('/', containerController.getImages, (req, res) => {
    return res.status(200)
})

// /api/api

module.exports = containerRouter;







