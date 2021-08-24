// const util = require('util');
// const exec = util.promisify(require('child_process').exec)  
const { exec } = require('child_process');
const path = require('path');

const promMetricsController = {};

//start prom/check if it's started
    //check if prom is running
    //if it is - set bool to true
    
    // docker run -p 9090:9090 -v .yml:etc/prometheus/prometheus.yml prom/prometheus
//
promMetricsController.startProm = (req, res, next) => {  
    console.log('Entered PromMetricsController.startProm');
    console.log('Res.locals.running came through: ', res.locals.running );
    if (res.locals.running) return next();
    exec(`docker run -p 9090:9090 -v ${path.join(__dirname, '../assets/promConfigFile.yaml')}:/etc/prometheus/prometheus.yml prom/prometheus`, (error, stdout, stderr) => {
        console.log('Entered prometheusStart');
        if (error) {
            console.log(`error: ${error.message}`);
            return next(error);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return next(stderr);
        };
        // console.log(stdout);
    });    
    return next();
}


promMetricsController.checkProm = async (req, res, next) => {
    console.log('entered CheckProm');
    let running = false;
    
    exec('docker ps', (error, stdout, stderr) => {
        console.log('Check if Prom is running');
        
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        };
        // console.log(stdout);
        
        const target = 'prom/prometheus';
        for (let i = 0; i < stdout.length && running === false; i++) {
            if (stdout[i] === 'p') {
                for (let j = 0; j < target.length; j++) {
                    const targetLetter = target[j];
                    const containersLetter = stdout[i];
                    if (targetLetter === containersLetter && target.length - 1 === j) {
                        running = true;
                    }
                    else if (targetLetter !== containersLetter) {
                        break;
                    }
                    i++;
                }
            }
        }
        res.locals.running = running;
        return next();
    })
}


promMetricsController.metricQuery = async (req, res, next) => {
    //recieve a query for metrics 
    const startTime = req.body.startTime; 
    // the out put will be an object full of metric data 
    const currentDate = new Date();
    let currentUnixTime = currentDate.now();
    console.log('Current Unix Time test: ', currentUnixTime, '\n start time: ', startTime);
    return next();
    //get a query string out of req body 
        //req body will receive time in unix time already parsed
    //get current date and time in unix format 
    //send query to local host 9090 with correct time
    //hardcode query
    // send query
    //console.log the object to see what it looks like //possible need to parse object 




    
}


module.exports = promMetricsController;


