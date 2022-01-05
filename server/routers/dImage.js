const express = require('express');
const imageController = require('../controllers/dImage.js');
const imageRouter = express.Router();
const authentication = require('../controllers/authentication');

imageRouter.get('/', authentication, imageController.getImages, (req, res) => {
  const result = res.locals.images;
  return res.status(200).send(result);
});

imageRouter.post(
  '/start',
  authentication,
  imageController.startImage,
  (req, res) => {
    return res.status(200).send('running');
  }
);

imageRouter.post(
  '/delete',
  authentication,
  imageController.deleteImage,
  (req, res) => {
    return res.status(200).send('deleted');
  }
);

imageRouter.post(
  '/pull',
  authentication,
  imageController.pullImage,
  (req, res) => {
    return res.status(200);
  }
);

imageRouter.post(
  '/build',
  authentication,
  imageController.buildImage,
  (req, res) => {
    return res.status(200);
  }
);

module.exports = imageRouter;
