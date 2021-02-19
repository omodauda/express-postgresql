'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User, {
        foreignKey: 'userId',
        allowNull: false,
        onDelete: 'CASCADE'
      })

      Profile.hasMany(models.Post, {
        foreignKey: 'userProfileId',
        onDelete: 'CASCADE'
      });

      Profile.hasMany(models.Comment, {
        foreignKey: 'userProfileId',
        onDelete: 'CASCADE'
      });
    }
  };
  Profile.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};