const jwt = require('jsonwebtoken');
const config = require('../config');

const AUTH_ERROR = { message: 'Authentication Error' };

const authentication = async (req, res, next) => {
  const authHeader = req.get('Authorization');
  if (!(authHeader && authHeader.startsWith('Bearer '))) {
    return res.status(401).json(AUTH_ERROR);
  }

  const token = authHeader.split(' ')[1];
  jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
    if (error) {
      return res.status(401).json(AUTH_ERROR);
    }
    next();
  });
};

module.exports = authentication;
