const { exec } = require('child_process');
const path = require('path');

const cadvisorStartController = {};

cadvisorStartController.restartCadvisor = async (req, res, next) => {
    console.log('Entered cadvisorStartController.restartProm');
    console.log(process.platform);

    try {
       await exec('docker start cadvisor', (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                if (error.message.includes('No such container: cadvisor')) {
                    console.log('cadvisorStartController.restartCadvisor: There is no cadvisor container');
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
            console.log('cadvisorStartController.restartCadvisor: successfully restarted Cadvisor container');
            res.locals.running = true;
            return next();
        })
    } catch (error) {
        return next(error);
    }
}

//this needs to be configured based on operating system
cadvisorStartController.startCadvisor = (req, res, next) => {
    console.log('Entered start Cadvisor');
    console.log('Res.locals.running came through: ', res.locals.running );
    if (res.locals.running) return next(); ////
    if (process.platform === 'linux' || process.platform === 'win32') {
        exec(`docker run --volume=/sys:/sys:ro --volume=/cgroup:/cgroup:ro --publish=9101:8080 --detach=true --name=cadvisor gcr.io/cadvisor/cadvisor:latest`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return next(error);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return next(stderr);
            };
        });
    }
    else {
        exec(`docker run -d --name=cadvisor -p 9101:8080 --volume=/:/rootfs:ro --volume=/var/run:/var/run:rw --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --volume=/sys/fs/cgroup:/sys/fs/cgroup:ro --volume=/dev/disk/:/dev/disk:ro raymondmm/cadvisor`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return next(error);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return next(stderr);
            };
        });
    }
    
    console.log('finished startProm');    
    return next();
}

module.exports = cadvisorStartController;