const { exec } = require('child_process');
const path = require('path');

const cadvisorStartController = {};

cadvisorStartController.restartCadvisor = async (req, res, next) => {
    console.log('Entered cadvisorStartController.restartProm');
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
    exec(`docker run --volume=/sys:/sys:ro --volume=/cgroup:/cgroup:ro --publish=9101:9101 --detach=true --name=cadvisor gcr.io/cadvisor/cadvisor:latest`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return next(error);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return next(stderr);
        };
    });
    console.log('finished startProm');    
    return next();
}

module.exports = cadvisorStartController;