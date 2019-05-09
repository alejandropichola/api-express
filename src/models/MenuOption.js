module.exports = function (sequelize, DataTypes) {
  const MenuOption = sequelize.define(
    'MenuOption',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      nameComponent: {
        field: 'name_component',
        type: DataTypes.STRING,
        allowNull: false
      },
      optionFather: {
        field: 'option_father',
        type: DataTypes.INTEGER,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      icon: {
        type: DataTypes.STRING
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

  return MenuOption
}
