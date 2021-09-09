const express = require('express');
const imageController = require('../controllers/dImage.js')
const imageRouter = express.Router();

imageRouter.get('/', imageController.getImages, (req, res) =>{
    const result = res.locals.images;
    return res.status(200).send(result);
})

imageRouter.post('/start', imageController.startImage, (req, res) => {
    return res.status(200).send('running');
})

imageRouter.post('/delete', imageController.deleteImage, (req, res) => {
    return res.status(200).send('deleted');
})

imageRouter.post('/pull', imageController.pullImage, (req, res) => {
    return res.status(200);
})

imageRouter.post('/build', imageController.buildImage, (req, res) => {
    return res.status(200);
})

module.exports = imageRouter;