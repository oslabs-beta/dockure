const dotenv = require('dotenv');
dotenv.config();

const config = {
  jwt: {
    secretKey: process.env.JWT_SECRET,
    expiresInSec: parseInt(process.env.JWT_EXPIRES_SEC),
  },
  bcrypt: {
    saltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS),
  },
  db: {
    host: process.env.DB_HOST,
  },
};

module.exports = config;
