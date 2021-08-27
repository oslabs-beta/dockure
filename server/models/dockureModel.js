const { Pool, client } = require('pg')
const PG_URI = 'postgres://uhlcuzrk:QyjpwnTOZcGgw-4l875XZxpF_u_Mvj_k@chunee.db.elephantsql.com/uhlcuzrk'

//CREATE A NEW POOL HERE USING THAT CONNECTION STRING ABOVE

const pool = new Pool({
  connectionString: PG_URI
});

const createUserTableQueryString = 'CREATE TABLE IF NOT EXISTS user (userID SERIAL NOT NULL , userName varchar(45) NOT NULL, password varchar(45) NOT NULL, PRIMARY KEY (userID))'
//do i have to make the userId and UserName unique in thid query string above?

pool.query(createUserTableQueryString, (err) => {
  if(err) console.log(err);
})


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
 }

};