const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');
const { exec } = require('child_process');

const yamlParserController = {};


yamlParserController.yamlConfig = (req, res, next) => {
    try {
        console.log('Entered yamlConfig');
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

        console.log('finished yamlConfig');
        return next();
    } catch (error) {
        console.log('yamlParserController Error: ', error);
        return next(error);
    }
}


yamlParserController.findPorts = (req, res, next) => {
    console.log('Entered findPorts');
    try {
        exec("docker ps", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }
            const result = stdout.split('\n');
            let values = [];
            result.forEach(ele => {
                values.push(ele.split("  ").filter(item => item !== ""));    
            })
            //parsing the keys of the object to make sure they are spaceless at front
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
            // console.log('Port values: ', values);
            console.log('finished findPorts');
            return next();
        });
    } catch (error) {
        console.log('Failed in YamlParserController.findPorts: ', error);
        return next(error);
    }
}


yamlParserController.portParser = (req, res, next) => {
    console.log('Entered portParser');
    const values = res.locals.unparsedContainers;
    const ports = [];
    //iterate thru the array 
    for(let i = 0; i < values.length; i += 1) {
        if(values[i]['IMAGE'] !== ' prom/prometheus') {
            ports.push(values[i]['PORTS']);
        }
    }
    // as long as '_IMAGE'is not _prom/prometheus  grab '_PORTS' value and place in an array
    //then parse new array elements to values we need (element values are strings);
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
    console.log('finished portParser ', ports);
    return next();
}


module.exports = yamlParserController;
