const jwt = require('jsonwebtoken');
const config = require('../config');
const pool = require('../database/dbConnect');

const AUTH_ERROR = { message: 'Authentication Error' };

const isAuth = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.jwt.secretKey, async (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    //need to check id if it is in data base => query.

    // (decoded.id)
    const id = decoded.id;
    const params = [id];
    const query = `SELECT id FROM users WHERE id=$1 `;
    const { rows } = await pool.query(query, params);
    // console.log('user: ', rows[0]);
    const user = rows[0];
    if (!user) {
      return res.status(401).json(AUTH_ERROR);
    }
    req.userId = user.id;
    req.token = token;
    next();
  });
};

module.exports = isAuth;
