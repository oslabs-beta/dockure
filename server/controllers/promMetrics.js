// const util = require('util');
// const exec = util.promisify(require('child_process').exec)  
const { exec } = require('child_process');
const path = require('path');

const promContainerController = {};

//start prom/check if it's started
    //check if prom is running
    //if it is - set bool to true
    
    // docker run -p 9090:9090 -v .yml:etc/prometheus/prometheus.yml prom/prometheus
//
promContainerController.startProm = (req, res, next) => {  
    console.log('Entered startProm');
    console.log('Res.locals.running came through: ', res.locals.running );
    if (res.locals.running) return next();
    exec(`docker run --name prometheus -p 9090:9090 -v ${path.join(__dirname, '../assets/prometheus.yaml')}:/etc/prometheus/prometheus.yml prom/prometheus`, (error, stdout, stderr) => {
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
    console.log('finished startProm');    
    return next();
}

promContainerController.restartProm = async (req, res, next) => {
    console.log('Entered promContainerController.restartProm');
    try {
        await exec('docker start prometheus', (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                if (error.message.includes('No such container: prometheus')) {
                    console.log('promContainerController.restartProm: There is no prometheus container');
                    return next();
                }
                else {
                    return next(error);
                }
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return next(stderr);
            };
            console.log('promContainerController.restartProm: successfully restarted prometheus container');
            res.locals.running = true;
            return next();
        })
    } catch (error) {
        return next(error);
    }
}


//Probably won't need anything below here

// promContainerController.checkProm = async (req, res, next) => {
//     console.log('entered CheckProm');
//     let running = false;
    
//     //for checking if it needs to be deleted even if it wasn't running
//     let toDelete = '';
//     if (res.locals.running !== undefined) toDelete = '-a';

//     exec(`docker ps ${toDelete}`, (error, stdout, stderr) => {
        
//         if (error) {
//             console.log(`error: ${error.message}`);
//             return;
//         }
//         if (stderr) {
//             console.log(`stderr: ${stderr}`);
//             return;
//         };
//         // console.log(stdout);
        
//         const target = 'prom/prometheus';
//         for (let i = 0; i < stdout.length && running === false; i++) {
//             if (stdout[i] === 'p') {
//                 for (let j = 0; j < target.length; j++) {
//                     const targetLetter = target[j];
//                     const containersLetter = stdout[i];
//                     if (targetLetter === containersLetter && target.length - 1 === j) {
//                         running = true;
//                         res.locals.promExists = true;
//                     }
//                     else if (targetLetter !== containersLetter) {
//                         break;
//                     }
//                     i++;
//                 }
//             }
//         }
//         res.locals.running = running;
//         console.log('finished checkProm: ', res.locals.running, res.locals.promExists);
//         return next();
//     })
// }

// promContainerController.killProm = async (req, res, next) => {
//     console.log('Entered killProm: ', res.locals.running);
//     if (!res.locals.running) return next();
//     else try {
//         exec('docker kill prometheus',  (error, stdout, stderr) => {
//             console.log('Killing prometheus');
//             if (error) {
//                 console.log(`error: ${error.message}`);
//                 return next(error);
//             }
//             if (stderr) {
//                 console.log(`stderr: ${stderr}`);
//                 return next(stderr);
//             };
//             res.locals.running = false;
//             console.log('finished killProm');
//             return next();
//             // console.log(stdout);
//         })
//     } catch (error) {
//         if (error) return next(error);
//     }
// }

// promContainerController.deleteProm = async (req, res, next) => {
//     console.log('entered delete Prom');
//     console.log('prom exists: ', res.locals.promExists);
//     if (!res.locals.promExists) return next();
//     try {
//         exec('docker rm prometheus',  (error, stdout, stderr) => {
//             console.log('Deleting prometheus');
//             if (error) {
//                 console.log(`error: ${error.message}`);
//                 return next(error);
//             }
//             if (stderr) {
//                 console.log(`stderr: ${stderr}`);
//                 return next(stderr);
//             };
//             res.locals.running = false;
//             console.log('finished deleteProm');
//             return next();
//             // console.log(stdout);
//         })
//     } catch (error) {
//         if (error) return next(error);
//     }
// }

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

