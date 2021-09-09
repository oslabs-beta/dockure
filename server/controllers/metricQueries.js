const fetch = require('node-fetch');

const metricQueriesController = {};

metricQueriesController.getMetrics = async (req, res, next) => {
    try {
        const start = res.locals.start;
        const end = res.locals.end;
        const metrics = req.query.query;
        const query = `http://localhost:9090/api/v1/query_range?query=${metrics}&start=${start}&end=${end}&step=15`;
        const data = await fetch(query);
        const results = await data.json();
        res.locals.values = results.data.result[0].values
        return next();
    } catch (error) {
        if (error) return next(error);
    }
    
}

module.exports = metricQueriesController;