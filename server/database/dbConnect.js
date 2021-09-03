const { Pool } = require('pg');
const config = require('../config');

const PG_URI = config.db.host;

// //CREATE A NEW POOL HERE USING THAT CONNECTION STRING ABOVE

const pool = new Pool({
  connectionString: PG_URI,
});

const createUserTable = `
 CREATE TABLE IF NOT EXISTS users (
   id SERIAL PRIMARY KEY, 
   username VARCHAR (50) UNIQUE NOT NULL, 
   password VARCHAR (150) NOT NULL, 
   email VARCHAR (50) UNIQUE NOT NULL
   )`;

// //do i have to make the userId and UserName unique in thid query string above?

pool.query(createUserTable, (err, res) => {
  if (err) {
    console.log(err);
    return;
  }
});

module.exports = pool;
