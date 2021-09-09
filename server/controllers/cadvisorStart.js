const { exec } = require('child_process');
const path = require('path');

const cadvisorStartController = {};

//Standard middleware error handling won't work here
cadvisorStartController.restartCadvisor = async (req, res, next) => {
    exec('docker start cadvisor');
    return next();
}

cadvisorStartController.startCadvisor = async (req, res, next) => {
    if (res.locals.cadvRunning) return next(); 
    if (process.platform === 'linux' || process.platform === 'win32') {
        await exec(`docker run --volume=/sys:/sys:ro --volume=/cgroup:/cgroup:ro --publish=9101:8080 --detach=true --name=cadvisor gcr.io/cadvisor/cadvisor:latest`, (error, stdout, stderr) => {});
    }
    else {
        await exec(`docker run -d --name=cadvisor -p 9101:8080 --volume=/:/rootfs:ro --volume=/var/run:/var/run:rw --volume=/sys:/sys:ro --volume=/var/lib/docker/:/var/lib/docker:ro --volume=/sys/fs/cgroup:/sys/fs/cgroup:ro --volume=/dev/disk/:/dev/disk:ro raymondmm/cadvisor`, (error, stdout, stderr) => {});
    }
    return next();
}

module.exports = cadvisorStartController;