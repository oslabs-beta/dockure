const { exec } = require('child_process');
const util = require('util');
const containerController = {};

// get all local docker images
containerController.getImages = (req, res, next) => {

    const convert = (stdout) => {
        let newArray = stdout.split("\n");
        let result = [];
        for (let i = 1; i < newArray.length - 1; i++) {
          let removedSpace = newArray[i].replace(/\s+/g, " "); // remove all spaces and replace it to 1 space
          removedSpace = removedSpace.replace(/\s[/]\s/g, "/"); // remove all the space in between slash
          let splittedArray = removedSpace.split(" ");
          result.push(splittedArray);
        }
        return result;
      };

      const convertArrToObj = (array, objArray) => {
        const result = [];
        for (let i = 0; i < array.length; i++) {
          let containerObj = {};
          for (let j = 0; j < array[i].length; j++) {
            containerObj[objArray[j]] = array[i][j];
          }
          result.push(containerObj);
        }
        return result;
      };
      
      let images = exec('docker images', (error, stdout, stderr) => {
        if (error) {
          alert(`${error.message}`);
          return;
        }
        if (stderr) {
          console.log(`stderr: ${stderr}`);
          return;
        }
        
        const value = convert(stdout);
        const objArray = ['reps', 'tag', 'imgid', 'size'];
        const resultImages = [];
        for (let i = 0; i < value.length; i++) {
          const innerArray = [];
          if (value[i][0] !== '<none>') {
            innerArray.push(value[i][0]);
            innerArray.push(value[i][1]);
            innerArray.push(value[i][2]);
            innerArray.push(value[i][6]);
            resultImages.push(innerArray);
          }
        }

        const convertedValue = convertArrToObj(
          resultImages,
          objArray
        );
    
        res.json(convertedValue);
        return convertedValue;
      });
      console.log(images)
    
      return next();
    };
    



module.exports = containerController;

