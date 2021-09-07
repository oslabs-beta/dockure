// const util = require('util');
// const exec = util.promisify(require('child_process').exec)  
const { exec } = require('child_process');
const path = require('path');

const promContainerController = {};

//Standard middleware error handling won't work here
promContainerController.restartProm = async (req, res, next) => {
    console.log('Entered promContainerController.restartProm');
    exec('docker start prometheus');
    return next();
}

promContainerController.startProm = async (req, res, next) => {  
    // console.log('Entered startProm');
    // console.log('Res.locals.running came through: ', res.locals.promRunning );
    if (res.locals.promRunning) return next();
    await exec(`docker run --name prometheus -p 9090:9090 -d -v ${path.join(__dirname, '../assets/prometheus.yaml')}:/etc/prometheus/prometheus.yml prom/prometheus`, (error, stdout, stderr) => {
        // console.log('Entered prometheusStart');
        // if (error) {
        //     console.log(`error: ${error.message}`);
        //     return next(error);
        // }
        // if (stderr) {
        //     console.log(`stderr: ${stderr}`);
        //     return next(stderr);
        // };
    });
    console.log('finished startProm');    
    return next();
}

/*
possible queries:
    process_resident_memory_bytes - amount of memory prometheus is using from the kernel
    process_virtual_memory_bytes - virtual memory size is the amount of address space that a process is managing
    process_cpu_seconds_total - equals to sum of utime and stime and divide by USER_HZ. This makes sense, as dividing number of scheduler ticks by Hz(ticks per second) produces total time in seconds operating system has been running the process.


    FROM Node exporter - would need to have a startup config for nodeExporter too which we don't have
    node_memory_Active_bytes - 

*/

// promContainerController.getMemory = (req, res, next) => {
//     return next();
// }

module.exports = promContainerController;

