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
    exec(`docker run -p 9090:9090 -v ${path.join(__dirname, '../assets/prometheus.yaml')}:/etc/prometheus/prometheus.yml prom/prometheus`, (error, stdout, stderr) => {
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





module.exports = promMetricsController;

// exec("docker image ls", (error, stdout, stderr) => {
//     if (error) {
//         console.log(`error: ${error.message}`);
//         return;
//     }
//     if (stderr) {
//         console.log(`stderr: ${stderr}`);
//         return;
//     }

//     const result = stdout.split('\n');
//     let values = [];
//     result.forEach(ele => {
//     values.push(ele.split(" ").filter(item => item !== ""));    
// })
//     const keys = values.shift();

//     values = values.map(function (element) {
//         const obj = {}; 
//         keys.forEach(function (key, index) {
//             if(element.length){
//             obj[key] = element[index];
//         }
//     });
//     return obj;
// });
//     if(JSON.stringify(values[values.length - 1]) === '{}') values.pop(); 
//     console.log(values)
// });



