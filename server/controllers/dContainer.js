const { exec } = require('child_process');
const axios = require('axios');
const util = require('util');
const conController = {};


conController.getContainers = async(req, res, next) => {
  try {
    const result = await axios.get('http://localhost:2375/containers/json?all=true')
    res.locals.containers = result.data;
    return next();
  } catch(err) {
    return next(err)
  }
}

conController.getStats = async (req, res, next) => {
  const { containerID } = req.body
  try {
    const result = await axios.get(`http://localhost:2375/containers/${containerID}/stats?stream=false`)
    res.locals.data = result.data
    return next();
  } catch(err) {
    console.log(err)
    return next(err)
  }
}

//https://docs.docker.com/engine/api/v1.24/
conController.startContainer = async (req, res, next) => {
  const { containerID } = req.body

  try {
    const { status } = await axios.post(`http://localhost:2375/containers/${containerID}/start`)
    res.locals.status = status;
    return next();
  } catch(err) {
    return next(err);
  }
}

conController.stopContainer = async (req, res, next) => {
  const { containerID } = req.body;

  try{
    const { status } = await axios.post(`http://localhost:2375/containers/${containerID}/stop`)
    res.locals.status = status;
    return next();
  } catch(err) {
    if(err.response.status === 304) {
      res.locals.status = 304;
      return next()
    }
    return next(err);
  }
};

conController.killContainer = async (req, res, next) => {
  const { containerID } = req.body
  try {
    const { status } = await axios.post(`http://localhost:2375/containers/${containerID}/kill`)
    res.locals.status = status;
    return next();
  } catch(err) {
    console.log('There was an error killing the container: ', err);
    return next(err)
  }
}

conController.restartContainer = async (req, res, next) => {
  const { containerID } = req.body

  try {
    const { status } = await axios.post(`http://localhost:2375/containers/${containerID}/restart?t=5`)
    res.locals.status = status;
    return next();
  } catch(err) {
    console.log('There was an error restarting the container: ', err);
    return next(err)
  }
}
  
conController.pauseContainer = async (req, res, next) => {
  const { containerID } = req.body

  try {
    const { status } = await axios.post(`http://localhost:2375/containers/${containerID}/pause`)
    
    res.locals.status = status;
    return next();
  } catch(err) {
    console.log('There was an error pausing the container: ', err);
    return next(err)
  }
}

conController.resumeContainer = async (req, res, next) => {

  const { containerID } = req.body


  try {
    const { status } = await axios.post(`http://localhost:2375/containers/${containerID}/unpause`)
    res.locals.status = status;
    return next();
  } catch(err) {
    console.log(err)
    return next(err)
  }
}

conController.removeContainer = async (req, res, next) => {
  const { containerID } = req.body

  try {
    const { status } = await axios.delete(`http://localhost:2375/containers/${containerID}`)
    res.locals.status = status;
    return next();
  } catch(err) {
    console.log(err)
    return next(err)
  }
}

//Standard middleware error handling won't work here
conController.restartSocat = async (req, res, next) => {
  exec('docker start socat');
  return next();
}

//docker run -d -v /var/run/docker.sock:/var/run/docker.sock --name socat -p 127.0.0.1:2375:2375 bobrik/socat TCP-LISTEN:2375,fork UNIX-CONNECT:/var/run/docker.sock
conController.startSocat = async (req, res, next) => {  
  if (res.locals.running) return next();
  await exec(`docker run -d -v /var/run/docker.sock:/var/run/docker.sock --name socat -p 127.0.0.1:2375:2375 bobrik/socat TCP-LISTEN:2375,fork UNIX-CONNECT:/var/run/docker.sock`, (error, stdout, stderr) => {});
  return next();
}

//throttler for getting containers
conController.throttle = async (req, res, next) => {
  let finished = false;
  const throttle = () => {
    setTimeout(async () => {
      await exec('docker ps', (error, stdout, stderr) => {
        if (finished) return next();
        if (stdout.includes('prometheus') && stdout.includes('cadvisor') && stdout.includes('socat')) {
          finished = true;
          throttle()
        }
        else {
          throttle();
        }
      })
    }, 200);
  }
  throttle();
}


module.exports = conController;

