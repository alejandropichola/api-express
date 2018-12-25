const jwt = require('jsonwebtoken')

const NotFoundException = require('../../exceptions/NotFoundException')
const ForbiddenException = require('../../exceptions/ForbiddenException')
const BadParametersException = require('../../exceptions/BadParametersException')
const RequireJSONException = require('../../exceptions/RequireJSONException')
const UserAuthException = require('../../exceptions/UserAuthException')

const HttpCodes = require('../../config/HttpCodes.json')
const ErrorCodes = require('../../config/ErrorCodes.json')

class ErrorController {
  static notFound () {
    throw new NotFoundException('Route not found')
  }

  static show (error, res) {
    ErrorController.log(error)

    const {errors, status} = ErrorController.transform(error)

    ErrorController.response(errors, status, res)
  }

  static log (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }

  static transform (error) {
    const errors = {
      'errors': []
    }

    // status code (default 500)
    let status = HttpCodes['INTERNAL_SERVER_ERROR'].code

    // updating status code
    if (error instanceof NotFoundException ||
      error instanceof ForbiddenException ||
      error instanceof BadParametersException ||
      error instanceof RequireJSONException ||
      error instanceof UserAuthException) {
      status = error.status
    }

    // list of errors?
    if (error instanceof BadParametersException) {
      for (const badParam of error.badParams) {
        const item = {
          'status': status.toString(),
          'title': error.name,
          'code': badParam.code,
          'source': {
            'pointer': badParam.sourcePointer
          },
          'detail': badParam.message
        }
        errors.errors.push(item)
      }
    } else if (error instanceof jwt.JsonWebTokenError ||
      error instanceof jwt.TokenExpiredError) {
      status = HttpCodes['UNAUTHORIZED'].code

      let code = ErrorCodes['JWT_TOKEN_INVALID'].toString()

      if (error instanceof jwt.TokenExpiredError) {
        code = ErrorCodes['JWT_TOKEN_EXPIRED'].toString()
      } else if (error.message === 'jwt must be provided') {
        code = ErrorCodes['JWT_TOKEN_REQUIRED'].toString()
      }

      const item = {
        'status': status.toString(),
        'title': error.name,
        'code': code,
        'source': {
          'pointer': '/header/token'
        },
        'detail': error.message
      }
      errors.errors.push(item)
    } else {
      const item = {
        'status': status.toString(),
        'title': error.name,
        'detail': error.message
      }
      errors.errors.push(item)
    }

    // extra data
    const env = process.env.NODE_ENV || 'local'
    if (env !== 'production') {
      errors.meta = {
        'trace': error.stack
      }
    }

    return {errors, status}
  }

  static response (errors, status, res) {
    res.status(status).json(errors)
  }
}

module.exports = ErrorController
