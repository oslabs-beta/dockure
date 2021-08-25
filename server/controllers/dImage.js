const axios = require('axios');
const { exec } = require('child_process');
const path = require('path');

const imageController = {};

imageController.getImages = async(req, res, next) => {
    try {
        const result = await axios.get('http://localhost:2375/images/json?all=true');
        res.locals.images = result.data;
        return next();
    } catch(err){
        console.log('There was an error getting images within imageController.getImages');
        return next(err);
    }
}

//need to refactor so works for startImage
imageController.startImage = (req, res, next) => {  
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

module.exports = imageController;