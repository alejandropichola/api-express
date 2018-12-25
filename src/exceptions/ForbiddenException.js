const BaseException = require('./BaseException')

const HttpCodes = require('../config/HttpCodes.json')

class ForbiddenException extends BaseException {
  constructor (message = 'Forbidden') {
    super(message)

    this.name = HttpCodes['FORBIDDEN'].msg
    this.status = HttpCodes['FORBIDDEN'].code
  }
}

module.exports = ForbiddenException
