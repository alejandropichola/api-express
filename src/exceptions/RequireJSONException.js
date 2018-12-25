const BaseException = require('./BaseException')

const HttpCodes = require('../config/HttpCodes.json')

class RequireJSONException extends BaseException {
  constructor (message = 'JSON content-type required') {
    super(message)

    this.name = HttpCodes['UNSUPPORTED_MEDIA_TYPE'].msg
    this.status = HttpCodes['UNSUPPORTED_MEDIA_TYPE'].code
  }
}

module.exports = RequireJSONException
