const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { exec } = require('child_process');

const yamlParserController = {};


yamlParserController.yamlConfig = (req, res, next) => {
    try {
        //get default yml
        const fileContents = fs.readFileSync(path.resolve(__dirname, '../assets/prometheus.yaml'));
        const data = yaml.load(fileContents);

        //update data 
        const addressesArray = data.scrape_configs[1].static_configs[0].targets;
        
        for (let i = 0; i < res.locals.ports.length; i++) {
            addressesArray.push('host.docker.internal:' + res.locals.ports[i]);
        }

        //write data
        const yamlStr = yaml.dump(data);
        fs.writeFileSync(path.resolve(__dirname, '../assets/promConfigFile.yaml'), yamlStr, 'utf8');
        return next();
    } catch (error) {
        return next(error);
    }
}


yamlParserController.findPorts = (req, res, next) => {
    try {
        exec("docker ps", (error, stdout, stderr) => {
            if (error) {
                return `error: ${error.message}`;
            }
            if (stderr) {
                return `stderr: ${stderr}`;
            }
            const result = stdout.split('\n');
            let values = [];
            result.forEach(ele => {
                values.push(ele.split("  ").filter(item => item !== ""));    
            })
            
            const keys = values.shift();
            for (let i = 0; i < keys.length; i++) {
                if (keys[i][0] === ' ') {
                    keys[i] = keys[i].slice(1);
                }
            }
            
            values = values.map(function (element) {
                const obj = {}; 
                keys.forEach(function (key, index) {
                    if(element.length) { 
                        obj[key] = element[index];
                    }
            });
            return obj;
        });
            if(JSON.stringify(values[values.length - 1]) === '{}') values.pop(); 
            res.locals.unparsedContainers = values;
            return next();
        });
    } catch (error) {
        return next(error);
    }
}


yamlParserController.portParser = (req, res, next) => {
    const values = res.locals.unparsedContainers;
    const ports = [];

    for(let i = 0; i < values.length; i += 1) {
        if(values[i]['IMAGE'] !== ' prom/prometheus') {
            ports.push(values[i]['PORTS']);
        }
    }
   
    let parsedPort = "";
    for(let i = 0; i < ports.length; i += 1){
        let foundColon = false;
        let foundDash = false;
        let index = 0;
        let indexOfString = ports[i][index];
        
        while(!foundDash) {  
            if( foundColon === true){
                parsedPort += indexOfString;
            }
            if(indexOfString === ':'){
                foundColon = true;
            }
            indexOfString = ports[i][++index];
            if(indexOfString === '-'){
                foundDash = true;
            }
        }
        ports[i] = parsedPort;
        parsedPort = ''
    }
    res.locals.ports = ports;
    return next();
}


module.exports = yamlParserController;
