'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('menu', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      nameComponent: {
        type: Sequelize.STRING,
        allowNull: false
      },
      optionFather: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      icon: {
        type: Sequelize.STRING
      },
      permission: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DATE
      }
    })
  },

  down: function (queryInteface, Sequelize) {
    return queryInteface.dropTable('users')
  }
}
