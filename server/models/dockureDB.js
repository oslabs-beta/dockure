const { Pool, client } = require('pg')
const PG_URI = 'postgres://uhlcuzrk:QyjpwnTOZcGgw-4l875XZxpF_u_Mvj_k@chunee.db.elephantsql.com/uhlcuzrk'

//CREATE A NEW POOL HERE USING THAT CONNECTION STRING ABOVE

const pool = new pool({
  connectionString: PG_URI
});

// CREATE TABLE 'user'(
//   "user_id" integer PRIMARY KEY,
//   "user_name" varchar NOT NULL,
//   "password" varchar NOT NULL,
// );


module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
}
};