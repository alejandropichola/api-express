const BaseException = require('./BaseException')

const HttpCodes = require('../config/HttpCodes.json')

class NotFoundException extends BaseException {
  constructor (message = 'Not Found') {
    super(message)

    this.name = HttpCodes['NOT_FOUND'].msg
    this.status = HttpCodes['NOT_FOUND'].code
  }
}

module.exports = NotFoundException
