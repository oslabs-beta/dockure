const { exec } = require('child_process');

const promMetricsController = {};

//start prom/check if it's started
    //check if prom is running
    //if it is - set bool to true
    
    // docker run -p 9090:9090 -v .yml:etc/prometheus/prometheus.yml prom/prometheus
//
promMetricsController.startProm = (req, res, next) => {  
    //else run exec to start it on port 9090
    console.log('Entered PromMetricsController.startProm');
    let prometheusStart = exec('docker run -p 9090:9090 prom/prometheus', (error, stdout, stderr) => {
        console.log('Entered prometheusStart');
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        };
        console.log(stdout);
    });
    setTimeout(() => {
        exec('docker ps', (error, stdout, stderr) => {
                console.log('Entered second part');
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                };
                console.log(stdout);
                res.send('itworked!');
            })
    }, 2000)
    
    return next();
}

module.exports = promMetricsController;
