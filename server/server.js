const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;
const cors = require('cors');

//import routers
const containerRouter = require('./routers/dContainer.js');
const promMetricsRouter = require('./routers/promMetrics.js');
const imageRouter = require('./routers/dImage.js');
const userRouter = require('./routers/user.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/', (req, res) => {
  return res.sendStatus(200);
});

//routing routers
app.use('/api/user', userRouter);
app.use('/api/containers', containerRouter);
app.use('/api/images', imageRouter);

//routing for prometheus metrics
app.use('/api/metrics', promMetricsRouter);

//unknown path handler
app.use('*', (req, res) => {
  res.status(404).send('That is an unknown url');
});

//global error handlings
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught an unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app };
