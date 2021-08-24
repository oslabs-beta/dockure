const express = require('express');
const imageController = require('../controllers/dImage.js')
const imageRouter = express.Router();

imageRouter.get('/', imageController.getImages, (req, res) =>{
    const result = res.locals.images;
    return res.status(200).send(result);
})

module.exports = imageRouter;