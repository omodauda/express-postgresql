'use strict';
const {
  Model
} = require('sequelize');
import bcrypt from 'bcryptjs';
import { async } from 'regenerator-runtime';

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Profile, {
        foreignKey: 'userId',
        allowNull: false,
        onDelete: 'CASCADE'
      })
    }
  };
  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeCreate: async( user, options) => {
        console.log('i was called')
        const salt = await bcrypt.genSalt(10);
        const hashedpassword = await bcrypt.hash(user.password, salt);
        user.password = hashedpassword;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};