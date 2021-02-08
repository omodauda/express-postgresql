import { sequelize } from '../database/models';

export default async function init() {
  const allowedEnv = ['development', 'production'];
  if (!process.env.NODE_ENV.includes(allowedEnv)) {
    return;
  }
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true, match: /_development$/ });
    }
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
