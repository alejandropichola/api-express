const BaseException = require('./BaseException')

const HttpCodes = require('../config/HttpCodes.json')

class BadParametersException extends BaseException {
  constructor (badParams, message = 'Bad Parameters') {
    super(message)

    this.name = HttpCodes['BAD_REQUEST'].msg
    this.status = HttpCodes['BAD_REQUEST'].code

    this.badParams = badParams
  }
}

module.exports = BadParametersException
