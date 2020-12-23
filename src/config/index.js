import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  environment: process.env.NODE_ENV || 'development',

  database: {
    development: {
      DB_HOST: process.env.DEV_DB_HOST,
      DB_NAME: process.env.DEV_DB_NAME,
      DB_USER: process.env.DEV_DB_USER,
      DB_PASSWORD: process.env.DEV_DB_PASSWORD,
    },
    production: {

    },
    test: {

    },
  },

  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
  test: process.env.NODE_ENV === 'test',
};
