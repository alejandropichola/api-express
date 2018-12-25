const jwt = require('jsonwebtoken')
const moment = require('moment')

const BaseController = require('./BaseExpress')
const Users = require('./users/User')
const AuthHelper = require('../helpers/AuthHelper')

const RequireJSONException = require('../exceptions/RequireJSONException')

const env = process.env.NODE_ENV || 'local'
const config = require('../config/config.json')[env]

class BaseAuthController extends BaseController {
  constructor (api, req, res, next) {
    super(api, req, res, next)

    this._initBaseAuth()

    return this
  }

  _initBaseAuth () {
    this.token = ''
  }

  _getBaseAuthParameters () {
    this._getBaseParameters()

    this._getJWTToken()
  }

  _getJWTToken () {
    this.token = this.req.header('Authorization') || this.req.query.token || ''
    this.token = AuthHelper.jwtTokenParam(this.token)
  }

  _requireJSON () {
    const contentType = this.req.get('content-type') || ''

    if (contentType !== 'application/json') {
      const msgLang = this.__('JSON content-type required')
      throw new RequireJSONException(msgLang)
    }
  }

  _validateJWTToken () {
    return new Promise((resolve, reject) => {
      jwt.verify(
        this.token,
        config.encrypt.secret,
        {
          algorithms: ['HS256'],
          issuer: 'api.mhfile.com'
        },
        (err, decoded) => {
          if (err) {
            reject(err)
          } else {
            resolve(decoded)
          }
        }
      )
    }).catch((err) => {
      if (err instanceof jwt.TokenExpiredError) {
        const decoded = jwt.decode(this.token)

        // real expire = 3 days
        const iat = moment(decoded.iat * 1000)
        const today = moment()
        if (today.diff(iat, 'days', true) >= 3) {
          throw err
        }

        const playLoad = {
          id: decoded.id,
          email: decoded.email,
          'first_name': decoded['first_name'],
          'last_name': decoded['last_name'],
          'rols': decoded.rols
        }

        return Users
          .createJWT(playLoad)
          .then((jwtToken) => {
            this.token = jwtToken
            return decoded
          })
      }

      throw err
    })
  }
}

module.exports = BaseAuthController
