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
        return next(err);
    }
}

imageController.startImage = (req, res, next) => {  
    
    res.locals.imageID = req.body.imageID
    exec(`docker run ${req.body.imageID}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return next(error);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return next(stderr);
        };
    });    
    return next();
}

imageController.deleteImage = (req, res, next) => {  
    res.locals.imageID = req.body.imageID

    exec(`docker image rm ${req.body.imageID}`, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return next(error);
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return next(stderr);
        };
    });    
    return next();
}

imageController.pullImage = (req, res, next) => {  

    const { imageName } = req.body
    
    try {
        exec(`docker pull ${imageName}`, (error, stdout, stderr) => {
            if (error) {
                return next(error);
            }
            if (stderr) {
                return next(stderr);
            };
        });
        return next();
      } catch(err) {
        return next(err)
      }
}

imageController.buildImage = (req, res, next) => {  
    try {
        exec(`docker build -t ${req.body.imageName} ${req.body.path}`, (error, stdout, stderr) => {
            if (error) {
                return next(error);
            }
            if (stderr) {
                return next(stderr);
            };
        });

        return next();
      } catch(err) {
        return next(err)
      }
}


module.exports = imageController;