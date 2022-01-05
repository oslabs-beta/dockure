const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const pool = require('../database/dbConnect');
const config = require('../config');
const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password, email } = req.body;

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(password, config.bcrypt.saltRounds);
  } catch (err) {
    return next({
      status: 500,
      message: err.message,
      message2: 'password error',
    });
  }

  try {
    const params = [username, hashedPassword, email];
    const query = `INSERT INTO users (username, password, email) VALUES ($1,$2,$3) RETURNING id`;
    const { rows } = await pool.query(query, params);
    res.locals.id = rows[0].id;

    const token = createJwtToken(res.locals.id);
    res.locals.token = token;

    return next();
  } catch (err) {
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
    const token = createJwtToken(res.locals.id);
    res.locals.token = token;
    return next();
  } catch (err) {
    return next({
      status: 500,
      message: err.message,
    });
  }
};

userController.me = async (req, res, next) => {
  const id = req.userId;
  const params = [id];
  const query = `SELECT * FROM users WHERE id=$1 `;
  const { rows } = await pool.query(query, params);
  const user = rows[0];
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.locals.id = user.id;
  res.locals.token = req.token;
  res.locals.username = user.username;
  next();
};

function createJwtToken(id) {
  return jwt.sign({ id }, config.jwt.secretKey, {
    expiresIn: config.jwt.expiresInSec,
  });
}

module.exports = userController;
