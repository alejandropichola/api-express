module.exports = function (sequelize, DataTypes) {
  const Rol = sequelize.define(
    'Rol',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: {
        type: DataTypes.STRING,
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
      tableName: 'rol'
    }
  )
  Rol.associate = function (models) {
    this.hasMany(models.RolPermission, {
      foreignKey: 'rolId',
      sourceKey: 'id'
    })
    this.hasMany(models.User, {
      foreignKey: 'rolId',
      sourceKey: 'id'
    })
  }
  return Rol
}
