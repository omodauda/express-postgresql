import { sequelize } from '../database/models';

export default async function init() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// const init = async () => {
//   let sequelize;
//   if (process.env.NODE_ENV === 'production') {
//     sequelize = new Sequelize(url, {
//       dialect,
//     });
//   } else {
//     sequelize = new Sequelize(database, username, password, {
//       dialect,
//       host,
//     });
//   }
//   await sequelize.authenticate();
//   console.log('Connection has been established successfully.');
//   await sequelize.sync({ alter: true });
//   return sequelize;
// };
