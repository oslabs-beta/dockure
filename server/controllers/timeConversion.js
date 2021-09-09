
const timeConversionController = {};

timeConversionController.unixTime = (req, res, next) => {
    try {
        let currentTime = new Date().valueOf();
        currentTime = currentTime/1000;
        const start = currentTime - (req.query.start * 3600); 
        res.locals.end = currentTime;
        res.locals.start = start;
        return next();  
    } catch (error) {
        return next(error);
    }
    
}

module.exports = timeConversionController;