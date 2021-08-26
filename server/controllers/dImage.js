const axios = require('axios');
const { exec } = require('child_process');
const path = require('path');

const imageController = {};

imageController.getImages = async(req, res, next) => {
    try {
        const result = await axios.get('http://localhost:2375/images/json?all=true');
        res.locals.images = result.data;
        return next();
    } catch(err){
        console.log('There was an error getting images within imageController.getImages');
        return next(err);
    }
}

//need to refactor so works for startImage
//we need to specify the port so that other containers aren't runing on the same ports. b
//ut for now this suhould work as long as other containers don't run on the same port

imageController.startImage = (req, res, next) => {  
    
    console.log('Entered into imageController.startImage')
    res.locals.imageID = req.query.imageID
    exec(`docker run ${req.query.imageID}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return next(error);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return next(stderr);
        };
        console.log('it worked~!!!!!');
    });    
    return next();
}

imageController.stopImage = (req, res, next) => {  
    
    console.log('Entered into imageController.stopImage')
    res.locals.imageID = req.query.imageID

    exec(`docker stop ${req.query.imageID}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return next(error);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return next(stderr);
        };
        console.log('it worked~!!!!!');
    });    
    return next();
}

imageController.pullImage = (req, res, next) => {  
    console.log('we are in pullImage')

    const { imageName } = req.body
    
    try {
        exec(`docker pull ${imageName}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return next(error);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return next(stderr);
            };
            console.log('it worked~!!!!!');
        });
        return next();
      } catch(err) {
        return next(err)
        // console.log('There was an error getting containers in the controller conController.getContainers: ' + err);
      }
}

imageController.buildImage = (req, res, next) => {  
    console.log('we are in buildImage')

    try {
        exec(`docker build -t ${req.body.imageName} ${req.body.path}`, (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return next(error);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return next(stderr);
            };
            console.log('it worked~!!!!!');
        });

        return next();
      } catch(err) {
        return next(err)
        // console.log('There was an error getting containers in the controller conController.getContainers: ' + err);
      }
}


module.exports = imageController;