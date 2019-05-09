'use strict'

const env = process.env.NODE_ENV || 'local'
const config = require('../src/config/config.json')[env]
const database = config['database'] || 'mhfile'

module.exports = {
  up: async function (queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`SET FOREIGN_KEY_CHECKS = 0`)

    await queryInterface.sequelize.query(
      `ALTER SCHEMA ${database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    )

    await queryInterface.sequelize.query(
      `ALTER DATABASE ${database} CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
    )

    const tables = await queryInterface.sequelize.query(
      'SELECT table_name FROM information_schema.tables where table_schema=:schema',
      {
        replacements: { schema: database },
        type: queryInterface.sequelize.QueryTypes.SELECT
      }
    )

    for (const table of tables) {
      await queryInterface.sequelize.query(
        `ALTER TABLE ${
          table['table_name']
          } CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`
      )
    }

    await queryInterface.sequelize.query(`SET FOREIGN_KEY_CHECKS = 1`)
  },

  down: function (queryInterface, Sequelize) {}
}
