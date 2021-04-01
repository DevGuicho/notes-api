require('dotenv').config();

const config = {
  dbPassword: process.env.DB_PASSWORD,
  dbUser: process.env.DB_USER,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME
};

module.exports = { config };
