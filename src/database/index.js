import { Sequelize } from 'sequelize';
import config from '../config';

const dbname = config.database[config.environment].DB_NAME;
const user = config.database[config.environment].DB_USER;
const password = config.database[config.environment].DB_PASSWORD;
const host = config.database[config.environment].DB_HOST;

const sequelize = new Sequelize(
  dbname,
  user,
  password,
  {
    host,
    dialect: 'mysql',
  },
);

const db = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

export {
  db,
  sequelize,
};
