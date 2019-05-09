module.exports = function (sequelize, DataTypes) {
  const RolPermission = sequelize.define(
    'Rol',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      rolId: {
        field: 'rol_id',
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'Rol',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      menuId: {
        field: 'menu_id',
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'MenuOption',
          key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
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
      tableName: 'rol_permission'
    }
  )
  RolPermission.associate = function (models) {
    this.belongsTo(models.Rol, {
      foreignKey: 'rolId',
      targetKey: 'id'
    })
    this.belongsTo(models.MenuOption, {
      foreignKey: 'menuId',
      targetKey: 'id'
    })
  }
  return RolPermission
}
