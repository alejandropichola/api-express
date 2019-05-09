'use strict'

module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('users', {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
      },
      rolId: {
        type: Sequelize.INTEGER.UNSIGNED,
        primaryKey: true,
        references: {
          model: 'rol',
          key: 'id'
        }
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      firstName: {
        field: 'first_name',
        type: Sequelize.STRING,
        allowNull: false
      },
      lastName: {
        field: 'last_name',
        type: Sequelize.STRING,
        allowNull: false
      },
      gender: {
        type: Sequelize.CHAR(1),
        defaultValue: 'M'
      },
      birthDate: {
        field: 'birth_date',
        type: Sequelize.DATEONLY
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
