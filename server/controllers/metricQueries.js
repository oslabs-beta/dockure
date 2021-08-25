
const metricQueriesController = {};

//expecting to receive a time in res.locals.start/end
//expecting to receive the query string for prometheus in the req.body
metricQueriesController.getMetrics = (req, res, next) => {
    console.log('Entered getMetrics');
    try {
        const start = res.locals.start;
        const end = res.locals.end;
        const metrics = req.body.query;
    } catch (error) {
        
    }
    
}

module.exports = metricQueriesController;