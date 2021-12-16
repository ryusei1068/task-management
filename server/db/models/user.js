'use strict';
const {
  Model
} = require('sequelize');
const {
  v4: uuidv4
} = require("uuid");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.TaskList, {foreignKey: 'userid'});
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user) => user.id = uuidv4())
  return User;
};
