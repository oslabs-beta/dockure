const { exec } = require('child_process');

const nodeExporter = {};

nodeExporter.start = (req, res, next) => {
    if (res.locals.nodeExists === true) return next();
    try {
        exec('docker run --name node-exporter -p 9100:9100 prom/node-exporter', (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return next(error);
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return next(stderr);
            };
        })
    } catch (error) {
        if (error) {
            return next(error);
        }
    }
    return next();
}

nodeExporter.check = (req, res, next) => {
    let running = false;
    let toCheck = '';
    if (res.locals.running !== undefined) toCheck = '-a';

    exec(`docker ps ${toCheck}`, (error, stdout, stderr) => {
        
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        };
        
        const target = 'prom/node-exporter';
        for (let i = 0; i < stdout.length && running === false; i++) {
            if (stdout[i] === 'p') {
                for (let j = 0; j < target.length; j++) {
                    const targetLetter = target[j];
                    const containersLetter = stdout[i];
                    if (targetLetter === containersLetter && target.length - 1 === j) {
                        if (res.locals.running === undefined) {
                            running = true;
                            res.locals.nodeExists = true; 
                        }
                        else {
                            res.locals.nodeExists = true;
                        }
                        
                    }
                    else if (targetLetter !== containersLetter) {
                        break;
                    }
                    i++;
                }
            }
        }
        res.locals.running = running;
        return next();
    })
}

nodeExporter.restart = (req, res, next) => {
    try {
        if (res.locals.nodeExists === true && res.locals.running === false) {
            exec('docker restart node-exporter', (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                };
            })
        }
        return next();
    } catch (error) {
        if (error) {
            return next(error);
        }
    }
}

module.exports = nodeExporter;
