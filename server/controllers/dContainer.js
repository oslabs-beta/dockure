const { exec } = require('child_process');
const axios = require('axios');
const util = require('util');
const conController = {};


conController.getContainers = async(req, res, next) => {
  //pass through res.locals.containers
  try {
    const result = await axios.get('http://localhost:2375/containers/json?all=true')
    // console.log(result, 'resulttttt in get containers')
    res.locals.containers = result.data;
    return next();
  } catch(err) {
    return next(err)
    // console.log('There was an error getting containers in the controller conController.getContainers: ' + err);
  }
}

conController.getStats = async (req, res, next) => {
  //pass through res.locals.containers
  const { containerID } = req.body
  // const idd = '3b160b3cf74b'
  // console.log(id)

  try {
    const result = await axios.get(`http://localhost:2375/containers/${containerID}/stats?stream=false`)
    res.locals.data = result.data
    
    // console.log(result.data, 'resultiltje4iotioajweiojewioj')
    return next();
  } catch(err) {
    console.log(err)
    return next(err)
    // console.log('There was an error getting containers in the controller conController.getContainers: ' + err);
  }
}

//https://docs.docker.com/engine/api/v1.24/
conController.startContainer = async (req, res, next) => {
  //pass through res.locals.containers
  console.log(req.body)
  const { containerID } = req.body
  // console.log(id)

  try {
    const { status } = await axios.post(`http://localhost:2375/containers/${containerID}/start`)
    
    // res.locals.data = result.data
    res.locals.status = status;
    console.log(status, 'status in start container');
    return next();
  } catch(err) {
    console.log('There was an error starting the container: ', err);
    return next(err);
    // console.log('There was an error getting containers in the controller conController.getContainers: ' + err);
  }
}

conController.stopContainer = async (req, res, next) => {
  const { containerID } = req.body;

  try{
    const { status } = await axios.post(`http://localhost:2375/containers/${containerID}/stop`)
    console.log('result in stop container', status);
    res.locals.status = status;
    return next();
  } catch(err) {
    console.log('There was an error stopping the container: ', err.response.status);
    if(err.response.status === 304) {
      res.locals.status = 304;
      return next()
    }
    return next(err);
  }
};

conController.killContainer = async (req, res, next) => {
  //pass through res.locals.containers
  const { containerID } = req.body
  // console.log(id)

  try {
    const result = await axios.post(`http://localhost:2375/containers/${containerID}/kill`)
    
    // res.locals.data = result.data
    res.locals.status = result;
    console.log(result, 'Result in kill container')
    return next();
  } catch(err) {
    console.log('There was an error killing the container: ', err);
    return next(err)
    // console.log('There was an error getting containers in the controller conController.getContainers: ' + err);
  }
}

conController.restartContainer = async (req, res, next) => {
  //pass through res.locals.containers
  const { containerID } = req.body
  // console.log(id)

  try {
    const result = await axios.post(`http://localhost:2375/containers/${containerID}/restart?t=5`)
    
    // res.locals.data = result.data
    res.locals.status = result;
    console.log(result, 'Result in kill container')
    return next();
  } catch(err) {
    console.log('There was an error restarting the container: ', err);
    return next(err)
    // console.log('There was an error getting containers in the controller conController.getContainers: ' + err);
  }
}
  
conController.pauseContainer = async (req, res, next) => {
  //pass through res.locals.containers
  const { containerID } = req.body
  // console.log(id)

  try {
    const result = await axios.post(`http://localhost:2375/containers/${containerID}/pause`)
    
    // res.locals.data = result.data
    res.locals.status = result;
    console.log(result, 'Container Paused')
    return next();
  } catch(err) {
    console.log('There was an error pausing the container: ', err);
    console.log(err)
    return next(err)
    // console.log('There was an error getting containers in the controller conController.getContainers: ' + err);
  }
}

conController.resumeContainer = async (req, res, next) => {
  //pass through res.locals.containers
  const { containerID } = req.body
  // console.log(id)

  try {
    const result = await axios.post(`http://localhost:2375/containers/${containerID}/unpause`)
    
    // res.locals.data = result.data
    res.locals.status = result;
    console.log(result, 'Result in resume container')
    return next();
  } catch(err) {
    console.log(err)
    return next(err)
    // console.log('There was an error getting containers in the controller conController.getContainers: ' + err);
  }
}

conController.removeContainer = async (req, res, next) => {
  //pass through res.locals.containers
  const { containerID } = req.body
  // console.log(id)

  try {
    const result = await axios.delete(`http://localhost:2375/containers/${containerID}`)
    
    // res.locals.data = result.data
    res.locals.status = result;
    console.log(result, 'Result in resume container')
    return next();
  } catch(err) {
    console.log(err)
    return next(err)
    // console.log('There was an error getting containers in the controller conController.getContainers: ' + err);
  }
}
  
  
module.exports = conController;

