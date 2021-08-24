const axios = require('axios');
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

module.exports = imageController;