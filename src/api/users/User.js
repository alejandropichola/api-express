const Models = require('../../models/index')
const jwt = require('jsonwebtoken')
const env = process.env.NODE_ENV || 'local'
const config = require('../../config/config.json')[env]

class User {
  static createJWT (playLoad) {
    return Promise
      .resolve()
      .then(() => {
        return new Promise((resolve, reject) => {
          jwt.sign(
            playLoad,
            config.encrypt.secret, {
              algorithm: 'HS256',
              expiresIn: '15m',
              issuer: 'api.mhfile.com'
            },
            (err, token) => {
              if (err) {
                reject(err)
              } else {
                resolve(token)
              }
            }
          )
        })
      })
      .catch((err) => {
        throw err
      })
  }

  static getUsers () {
    return Models.User.findAll({
      attributes: [
        'id',
        'first_name',
        'last_name',
        'email',
        'gender',
        'password',
        'birth_date',
        'enabled',
        'rolId'
      ]
    })
  }

  static getUser (userId) {
    return Models.User.findOne({
      attributes: [
        'id',
        'first_name',
        'last_name',
        'email',
        'gender',
        'birth_date',
        'enabled',
        'rol'
      ],
      where: {
        id: userId
      }
    })
  }

  static addUser (self) {
    return Models.User.create({
      firstName: self.firstName,
      lastName: self.lastName,
      email: self.email,
      gender: self.gender,
      password: self.password,
      birthDate: self.birthDate,
      rolId: self.rol
    })
  }

  static updateUser (self) {
    return Models.User.update({
      firstName: self.firstName,
      lastName: self.lastName,
      email: self.email,
      gender: self.gender,
      password: self.password,
      birthDate: self.birthDate,
      rolId: self.rol
    }, {
      where: {
        id: self.userId
      }
    })
  }

  static formatUsers (users = [], path = '/') {
    const dataUsers = []
    users.forEach(item => {
      const data = User.formatUser(item, path)
      dataUsers.push(data)
    })

    const response = {
      type: 'users',
      data: dataUsers,
      path: {
        self: `${path}users`
      }
    }
    return response
  }

  static deleteUser (userId) {
    return Models.User.destroy({
      where: {
        id: userId
      }
    })
  }

  static responseDelete (path = '/') {
    const response = {
      path: {
        self: `${path}users`
      }
    }
    return response
  }
  static formatUser (user, path = '') {
    const id = user ? user.id : null
    const firstName = user ? user.get('first_name') : null
    const lastName = user ? user.get('last_name') : null
    const email = user ? user.email : null
    const gender = user ? user.gender : 'M'
    const birthDate = user ? user.get('birth_date') : null
    const enabled = user ? user.enabled : true
    const rol = user ? user.rolId : null
    const response = {
      type: 'users',
      userId: id,
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        gender: gender,
        birthDate: birthDate,
        enabled: enabled,
        rol: rol
      },
      path: {
        self: `${path}users/${id}`
      }
    }
    return response
  }

  static responseAddUser (self, path = '/') {
    const response = {
      type: 'users',
      parameters: {
        firstName: self.firstName,
        lastName: self.lastName,
        gender: self.gender,
        email: self.email,
        rol: self.rol
      },
      path: {
        self: `${path}users`
      }
    }

    return response
  }

  static responseUpdateUser (self, path = '/') {
    const response = {
      type: 'users',
      userId: self.userId,
      parameters: {
        firstName: self.firstName,
        lastName: self.lastName,
        gender: self.gender,
        email: self.email,
        rol: self.rol
      },
      path: {
        self: `${path}users/${self.userId}`
      }
    }

    return response
  }
}

module.exports = User
