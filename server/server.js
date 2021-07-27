const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

const leaderList = [
  { name: 'Anna', id: 'a0' },
  { name: 'Ben', id: 'b0' },
  { name: 'Clara', id: 'c0' },
  { name: 'David', id: 'd0' },
];

app.get('/api/leaders', (req, res) => {
  return res.status(200).send(leaderList);
});

if (process.env.NODE_ENV === 'production') {
  app.use('/build', express.static(path.join(__dirname, '../build')));
  app.get('/', (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});

module.exports = app; //-> http://localhost:3000/
// localhost:8080
