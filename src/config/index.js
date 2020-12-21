import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT,
  environment: process.env.NODE_ENV || 'development',

  databaseUrl: {
    development: process.env.DEVELOPMENT_DATABASE_URL,
    production: process.env.PRODUCTION_DATABASE_URL,
    test: process.env.TEST_DATABASE_URL,
  },

  development: process.env.NODE_ENV === 'development',
  production: process.env.NODE_ENV === 'production',
  test: process.env.NODE_ENV === 'test',
};
