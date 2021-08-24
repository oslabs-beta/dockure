const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

//import routers
const containerRouter = require('./routers/dContainer.js')

app.get('/', (req, res) =>{
    return res.sendStatus(200);
});


//routing routers
app.use('/api', containerRouter)


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

module.exports = { app }; 