'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TaskList extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      TaskList.belongsTo(models.User, {
        foreignKey: 'userid',
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      }),
      TaskList.hasMany(models.Task, {foreignKey: 'tasklistid'});
    }
  };
  TaskList.init({
    listName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'TaskList',
  });
  return TaskList;
};
