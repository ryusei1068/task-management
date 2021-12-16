'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('TaskLists', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        autoIncrement: true 
      },
      listName: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      userid: {
        type: Sequelize.UUID,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        references: {
          model: {
            tableName: 'Users',
            key: 'id',
          },
        },
        allowNull: false,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('TaskLists');
  }
};
