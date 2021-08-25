
const timeConversionController = {};

//expecting to receive an unparsed simple time such as 1h, 6h, 24h in the req.query
timeConversionController.unixTime = (req, res, next) => {
    //get current Unix time in seconds
    console.log('entered unixTime');

    try {
        console.log('req.query.start: ', req.query);
        let currentTime = new Date().valueOf();
        currentTime = currentTime/1000;

        //get time from req.body and convert to unix time
        const start = currentTime - (req.query.start * 3600); 

        //pass these values onto the query controller
        res.locals.end = currentTime;
        res.locals.start = start;

        return next();  
    } catch (error) {
        console.log('error reached: ', error);
        if (error) return next(error);
    }
    
}
//end needs to be current unix time in seconds
//start needs to be current unix time in seconds minus the gap (1 hour is 3600)


//1629898710.201
//1629902165
//1629902370589

//just need to divide the valueOf of the data by 1000 

// should have 1 hr difference
//1629902310.201
//1629898710.201
// === 3600
//1 hr in seconds is 3600
module.exports = timeConversionController;