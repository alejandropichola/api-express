module.exports = function (sequelize, DataTypes) {
  const Menu = sequelize.define(
    'Menu',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      nameComponent: {
        type: DataTypes.STRING,
        allowNull: false
      },
      optionFather: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      icon: {
        type: DataTypes.STRING
      },
      permission: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      }
    },
    {
      underscored: true,
      freezeTableName: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      tableName: 'menu'
    }
  )

  return Menu
}
