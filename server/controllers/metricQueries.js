const fetch = require('node-fetch');

const metricQueriesController = {};

//expecting to receive a time in res.locals.start/end
//expecting to receive the query string for prometheus in the req.body
metricQueriesController.getMetrics = async (req, res, next) => {
    console.log('Entered getMetrics');
    try {
        const start = res.locals.start;
        const end = res.locals.end;
        const metrics = req.query.query;
        //may need to modify step
        const query = `http://localhost:9090/api/v1/query_range?query=${metrics}&start=${start}&end=${end}&step=1`;
        console.log('query string: ', query);

        //can make a loop to finish all queries here - might need multiple queries - but this might have to come from the req body in the form of a loop then instead of a req query

        //make fetch request
        const data = await fetch(query);
        const results = await data.json();
        // console.log('we successfully grabbed data');
        //save the results to res.locals
        res.locals.values = results.data.result[0].values
        console.log('query results: ', results.data.result[0].values);
        
        return next();
    } catch (error) {
        if (error) return next(error);
    }
    
}

module.exports = metricQueriesController;