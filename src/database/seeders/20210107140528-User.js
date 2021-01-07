'use strict';
const bcrypt = require('bcryptjs');
const password = 'seed';
const hash = bcrypt.hashSync(password, 10);

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Users', [
    {
      id: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      email: "seed@gmail.com",
      password: hash,
      createdAt: new Date(),
      updatedAt: new Date(),
    }
   ], {});

   await queryInterface.bulkInsert('Profiles', [
     {
      id: "67e0350f-ed09-46b0-83d7-8a135afeaf96",
      userId: "98e0350f-ed09-46b0-83d7-8a135afeaf84",
      first_name: "seed",
      last_name: "seed",
      age: 21,
      createdAt: new Date(),
      updatedAt: new Date(),
     }
   ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
