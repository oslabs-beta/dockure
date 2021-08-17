const { exec } = require('child_process')

const testing = () => {
    console.log('it works');
  exec(
    'ls',
    (error, stdout, stderr) => {
      if (error) {
        return(`${error.message}`);
      }
      if (stderr) {
        return `stderr: ${stderr}`;
      } else return stdout
    }
  );
};


export const newTest = testing()


