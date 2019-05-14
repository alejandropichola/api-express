const BaseAuthController = require('../BaseAuthExpress')
const Users = require('./User')
const UsersValidator = require('./UserValidator')
const BadParametersException = require('../../exceptions/BadParametersException')

class UserController extends BaseAuthController {
  constructor (api, req, res, next) {
    super(api, req, res, next)
    this._init()
    return this
  }

  _init () {
    this.userId = ''
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.gender = ''
    this.rol = ''
    this.birthDate = null
    this.password = null
    this.users = []
    this.errors = []
  }

  _reset () {
    this._initBase()
    this._initBaseAuth()
    this._init()
  }

  getUsers () {
    this._reset()
    return Promise
      .resolve()
      .then(() => {
        this._getBaseAuthParameters()
      })
      .then(() => {
        return Users.getUsers()
      })
      .then((response) => {
        return this._response(response)
      })
      .catch(this.next)
  }

  addUser () {
    this._reset()
    return Promise
      .resolve()
      .then(() => {
        return this._getParameters()
      })
      .then(() => {
        return Users.addUser(this)
      })
      .then(() => {
        return this._responseAdd()
      })
      .catch(this.next)
  }

  updateUser () {
    this._reset()
    return Promise
      .resolve()
      .then(() => {
        return this._getParametersUpdate()
      })
      .then(() => {
        return Users.updateUser(this)
      })
      .then(() => {
        return this._responseUpdate()
      })
      .catch(this.next)
  }

  _getParameters () {
    return Promise
      .resolve()
      .then(() => {
        this._getBaseAuthParameters()
        this._requireJSON()
      })
      .then(() => {
        this.req.body.data = this.req.body.data || {}
        this.req.body.data.attributes = this.req.body.data.attributes || {}
        this._getFirstName()
        this._getLastName()
        this._getEmail()
        this._getPassword()
        this._getGender()
        this._getBirthData()
        this._getRol()
        if (this.errors.length > 0) {
          throw new BadParametersException(this.errors)
        }
      })
      .catch((err) => {
        throw err
      })
  }

  _getParametersUpdate () {
    return Promise
      .resolve()
      .then(() => {
        this._getBaseAuthParameters()
        this._requireJSON()
      })
      .then(() => {
        this._getUserId()
        this.req.body.data = this.req.body.data || {}
        this.req.body.data.attributes = this.req.body.data.attributes || {}
        this._getFirstName()
        this._getLastName()
        this._getEmail()
        this._getPassword()
        this._getGender()
        this._getBirthData()
        this._getRol()
        if (this.errors.length > 0) {
          throw new BadParametersException(this.errors)
        }
      })
      .catch(err => {
        throw err
      })
  }

  getUser () {
    this._reset()
    return Promise
      .resolve()
      .then(() => {
        return this._getParametersItem()
      })
      .then(() => {
        return Users.getUser(this.userId)
      })
      .then((user) => {
        return this._responseUser(user)
      })
      .catch(this.next)
  }

  deleteUser () {
    this._reset()
    return Promise
      .resolve()
      .then(() => {
        return this._getParametersItem()
      })
      .then(() => {
        return Users.deleteUser(this.userId)
      })
      .then(() => {
        return this._responseDelete()
      })
      .catch(this.next)
  }

  _getParametersItem () {
    return Promise
      .resolve()
      .then(() => {
        this._getBaseAuthParameters()
      })
      .then(() => {
        this._getUserId()
        if (this.errors.length > 0) {
          throw new BadParametersException(this.errors)
        }
      })
      .catch(err => {
        throw err
      })
  }

  _getLastName () {
    this.lastName = this.req.body.data.attributes.lastName || ''
    UsersValidator.validateLastName(this)
  }

  _getFirstName () {
    this.firstName = this.req.body.data.attributes.firstName || ''
    UsersValidator.validateFirstName(this)
  }

  _getPassword () {
    this.password = this.req.body.data.attributes.password || ''
    UsersValidator.validatePassword(this)
  }

  _getRol () {
    this.rol = this.req.body.data.attributes.rol || ''
  }

  _getEmail () {
    this.email = this.req.body.data.attributes.email || ''
    UsersValidator.validateEmail(this)
  }

  _getGender () {
    this.gender = this.req.body.data.attributes.gender || 'M'
    UsersValidator.validateGender(this)
  }

  _getBirthData () {
    this.birthDate = this.req.body.data.attributes.birthDate || ''
    UsersValidator.validateBirthDate(this)
  }

  _getUserId () {
    this.userId = this.req.params.userId || ''
    UsersValidator.validateUserId(this)
  }

  _response (users) {
    const data = Users.formatUsers(users, this.path)
    return this.res.json(data)
  }

  _responseAdd () {
    const data = Users.responseAddUser(this, this.path)
    return this.res.json(data)
  }

  _responseUpdate () {
    const data = Users.responseUpdateUser(this, this.path)
    return this.res.json(data)
  }

  _responseUser (user) {
    const data = Users.formatUser(user, this.path)
    return this.res.json(data)
  }

  _responseDelete () {
    const response = Users.responseDelete(this.path)

    this.res.json(response)
  }
}

module.exports = UserController
