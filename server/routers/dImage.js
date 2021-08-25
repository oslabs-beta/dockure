const express = require('express');
const imageController = require('../controllers/dImage.js')
const imageRouter = express.Router();

imageRouter.get('/', imageController.getImages, (req, res) =>{
    const result = res.locals.images;
    return res.status(200).send(result);
})

imageRouter.post('/start', imageController.startImage, (req, res) => {
    return res.status(200);
})

imageRouter.post('/stop', imageController.startImage, (req, res) => {
    return res.status(200);
})

// imageRouter.post('/stop', imageController.stopImage, (req, res) => {
//     return res.status(200);
// })

module.exports = imageRouter;