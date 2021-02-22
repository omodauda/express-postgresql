'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(
      'comments', //table name
      'postId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'posts', //table name
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );

    await queryInterface.addColumn(
      'comments',
      'userProfileId',
      {
        type: Sequelize.UUID,
        references: {
          model: 'Profiles',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */

    //remove postId ref on comments table
    await queryInterface.removeColumn(
      'comments',
      'postId'
    );
    
    //remove userProfile ref on comments table
    await queryInterface.removeColumn(
      'comments',
      'userProfileId'
    );
  }
};
