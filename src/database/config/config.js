require('dotenv').config();

module.exports = {
  development: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DEV_DB,
    host: "localhost",
    dialect: "postgres",
    logging: false
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB,
    host: "localhost",
    dialect: "postgres",
    logging: false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  }
};
