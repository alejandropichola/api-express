const BaseException = require('./BaseException')

const HttpCodes = require('../config/HttpCodes.json')

class UserAuthException extends BaseException {
  constructor (message = 'Unauthorized') {
    super(message)

    this.name = HttpCodes['UNAUTHORIZED'].msg
    this.status = HttpCodes['UNAUTHORIZED'].code
  }
}

module.exports = UserAuthException
