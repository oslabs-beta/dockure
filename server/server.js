const path = require('path'); 
const express = require('express'); 
const fs = require('fs'); 
const { exec } = require('child_process');

const index = path.join(__dirname, '../index.html') 

const app = express(); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 

const PORT = 3000; 

console.log(__dirname) 
const testing = () => {
    console.log('it works');
  exec(
    'ls',
    (error, stdout, stderr) => {
      if (error) {
        alert(`${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      } else console.log(stdout, 'stdout!!')
    }
  );
};

app.use('/build', express.static(path.join(__dirname, '../build'))); 

app.get('/', (req, res) => res.sendFile(index)); 

app.post('/', testing, (req, res) => {
    res.status(200)
})

app.listen(PORT, () => { console.log(`Server listening on port: ${PORT}`); }); 

module.exports = app;
