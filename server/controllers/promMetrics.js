const { exec } = require('child_process');

const promMetricsController = {};

//start prom/check if it's started
    //check if prom is running
    //if it is - set bool to true
    //else run exec to start it on port 9090
    // docker run -p 9090:9090 -v .yml:etc/prometheus/prometheus.yml prom/prometheus
//

module.exports(promMetricsController);