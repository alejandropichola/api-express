module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      rolId: {
        field: 'rol_id',
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'Rol',
          Key: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      firstName: {
        field: 'first_name',
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        field: 'last_name',
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.CHAR(1),
        defaultValue: 'M'
      },
      birthDate: {
        field: 'birth_date',
        type: DataTypes.DATEONLY
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
      tableName: 'users'
    }
  )
  User.associate = function (models) {
    this.belongsTo(models.Rol, {
      foreignKey: 'rolId',
      targetKey: 'id'
    })
  }
  return User
}
