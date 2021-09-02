const bcrypt = require('bcryptjs');
const pool = require('../database/dbConnect');
const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password, email } = req.body;

  let hashedPassword;
  try {
    const salt = bcrypt.genSaltSync(10);
    hashedPassword = bcrypt.hashSync(password, salt);
  } catch (err) {
    return next({
      status: 500,
      message: err.message,
      message2: 'password error',
    });
  }

  try {
    const params = [username, hashedPassword, email];
    console.log(params);
    const query = `INSERT INTO users (username, password, email) VALUES ($1,$2,$3) RETURNING id`;
    const { rows } = await pool.query(query, params);
    res.locals.id = rows[0].id;
    return next();
  } catch (err) {
    console.log(err);
    return next({
      status: 500,
      message: 'Username already exists',
    });
  }
}; 

userController.userLogin = async (req, res, next) => {
    const { username, password } = req.body;
    let user;
    
    try {
      const params = [username];
      const query = `SELECT * FROM users WHERE username=$1`;

      const { rows } = await pool.query(query, params);
      if (rows.length < 1) {
        return next({
          status: 401,
          message: 'Invalid username or password',
        });
      }
        user = rows[0];
      const compared = await bcrypt.compare(password, user.password);
    if (!compared)
      return next({
        status: 401,
        message: 'The username or password is not valid.',
      });
    res.locals.id = user.id;
    return next();
    } catch (err) {
      console.log('user:', err)
      return next({
        status: 500,
        message: err.message,
      });
    }

    
}; 

module.exports = userController;
