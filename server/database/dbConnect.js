const { Pool } = require('pg');
const PG_URI =
  // 'postgres://uhlcuzrk:QyjpwnTOZcGgw-4l875XZxpF_u_Mvj_k@chunee.db.elephantsql.com/uhlcuzrk';
  'postgres://luycftnr:pwXwQwpMXxUtF9zEJsdmXTMZ0xKMe_ij@chunee.db.elephantsql.com/luycftnr';

// //CREATE A NEW POOL HERE USING THAT CONNECTION STRING ABOVE

const pool = new Pool({
  connectionString: PG_URI,
});

 const createUserTable = `
 CREATE TABLE IF NOT EXISTS users (
   id SERIAL PRIMARY KEY , 
   userName VARCHAR (50) UNIQUE NOT NULL, 
   password VARCHAR (50) NOT NULL, 
   email VARCHAR (100) UNIQUE NOT NULL
   )`;

 // //do i have to make the userId and UserName unique in thid query string above?

pool.query(createUserTable, (err, res) => {
  if(err) {
    console.log(err)
    return;
  }
});

module.exports = pool;

