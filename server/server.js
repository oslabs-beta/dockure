const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

//import routers
const containerRouter = require('./routers/dContainer.js');
const promMetricsRouter = require('./routers/promMetrics.js');

app.get('/', (req, res) =>{
    return res.sendStatus(200);
});


//routing routers
app.use('/api', containerRouter);

//routing for prometheus metrics
app.use('/metrics', promMetricsRouter);

//global error handlings

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app }; 