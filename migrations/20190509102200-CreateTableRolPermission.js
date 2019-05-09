'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('rol_permission', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      rolId: {
        field: 'rol_id',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'rol',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      menuId: {
        field: 'menu_id',
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'menu',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
    return queryInteface.dropTable('rol_permission')
  }
}
