const express = require('express');
const conController = require('../controllers/dContainer.js');
const containerRouter = express.Router();
const promContainerController = require('../controllers/promMetrics');
const cadvisorStartController = require('../controllers/cadvisorStart');
const authentication = require('../controllers/authentication');

containerRouter.get(
  '/',
  promContainerController.restartProm,
  promContainerController.startProm,
  cadvisorStartController.restartCadvisor,
  cadvisorStartController.startCadvisor,
  conController.restartSocat,
  conController.startSocat,
  conController.throttle,
  (req, res) => {
    return res.status(200).send('It worked');
  }
);

containerRouter.get(
  '/containers',
  authentication,
  conController.getContainers,
  (req, res) => {
    const result = res.locals.containers;
    return res.status(200).send(result);
  }
);

containerRouter.post('/stats', conController.getStats, (req, res) => {
  const result = res.locals.data;
  return res.status(200).json(result);
});

containerRouter.post(
  '/start',
  authentication,
  conController.startContainer,
  (req, res) => {
    return res.sendStatus(res.locals.status);
  }
);

containerRouter.post(
  '/stop',
  authentication,
  conController.stopContainer,
  (req, res) => {
    return res.sendStatus(res.locals.status);
  }
);

containerRouter.post(
  '/kill',
  authentication,
  conController.killContainer,
  (req, res) => {
    return res.sendStatus(res.locals.status);
  }
);

containerRouter.post(
  '/restart',
  authentication,
  conController.restartContainer,
  (req, res) => {
    return res.sendStatus(res.locals.status);
  }
);

containerRouter.post(
  '/pause',
  authentication,
  conController.pauseContainer,
  (req, res) => {
    return res.sendStatus(res.locals.status);
  }
);

containerRouter.post(
  '/resume',
  authentication,
  conController.resumeContainer,
  (req, res) => {
    return res.sendStatus(res.locals.status);
  }
);

containerRouter.post(
  '/remove',
  authentication,
  conController.removeContainer,
  (req, res) => {
    return res.sendStatus(res.locals.status);
  }
);

module.exports = containerRouter;
