const { exec } = require('child_process');
const path = require('path');

const promContainerController = {};

//Standard middleware error handling won't work here
promContainerController.restartProm = async (req, res, next) => {
    exec('docker start prometheus');
    return next();
}

promContainerController.startProm = async (req, res, next) => {  
    if (res.locals.promRunning) return next();
    await exec(`docker run --name prometheus -p 9090:9090 -d -v ${path.join(__dirname, '../assets/prometheus.yaml')}:/etc/prometheus/prometheus.yml prom/prometheus`, (error, stdout, stderr) => {});  
    return next();
}


module.exports = promContainerController;

