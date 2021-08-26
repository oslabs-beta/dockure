const { exec } = require('child_process');
const axios = require('axios');
const util = require('util');
const conController = {};


conController.getContainers = async(req, res, next) => {
  //pass through res.locals.containers
  try {
    const result = await axios.get('http://localhost:2375/containers/json?all=true')
    res.locals.containers = result.data;
    return next();
  } catch(err) {
    return next(err)
    // console.log('There was an error getting containers in the controller conController.getContainers: ' + err);
  }
}

conController.getStats = async (req, res, next) => {
  //pass through res.locals.containers
  const { id } = req.body
  const idd = '3b160b3cf74b'
  // console.log(id)

  try {
    const result = await axios.get(`http://localhost:2375/containers/${id}/stats?stream=false`)
    res.locals.data = result.data
    console.log(result.data, 'resultiltje4iotioajweiojewioj')
    return next();
  } catch(err) {
    console.log(err)
    return next(err)
    // console.log('There was an error getting containers in the controller conController.getContainers: ' + err);
  }
}

  
module.exports = conController;

