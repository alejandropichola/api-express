const HttpCodes = require('../config/HttpCodes.json')

class BaseException extends Error {
  constructor (message = '') {
    super(message)

    this.name = HttpCodes['INTERNAL_SERVER_ERROR'].msg
    this.status = HttpCodes['INTERNAL_SERVER_ERROR'].code
  }
}

module.exports = BaseException
