const path = require('path')
const i18n = require('i18n')
const validator = require('validator')
const moment = require('moment')

const ErrorItem = require('../api/errors/ErrorItem')

class ParamsValidator {
  static __ (phrase, args) {
    i18n.configure(
      {
        locales: ['en', 'es'],
        defaultLocale: 'en',
        directory: path.join(__dirname, '../locales'),
        objectNotation: true
      }
    )

    const locale = i18n.getLocale()

    return i18n.__(
      {
        phrase: phrase,
        locale: locale
      },
      args
    )
  }

  static validate (param, rules = {}) {
    let data = (param === null) ? '' : param + ''

    const name = rules.name || 'param'
    const source = rules.source || 'body'
    const lowercase = rules.lowercase || false
    const trim = rules.trim || false
    const isRequired = rules.isRequired || false
    const isRequiredCode = rules.isRequiredCode || ''
    const isEqual = rules.equal || false
    const isEqualCode = rules.isEqualCode || ''
    const isIn = rules.isIn || false
    const isInCode = rules.isInCode || ''
    const maxLength = rules.maxLength || false
    const maxLengthCode = rules.maxLengthCode || ''
    const isUUID = rules.isUUID || false
    const isUUIDCode = rules.isUUIDCode || ''
    const isInteger = rules.isInteger || false
    const isIntegerCode = rules.isIntegerCode || ''
    const isPositiveInteger = rules.isPositiveInteger || false
    const isPositiveIntegerCode = rules.isPositiveIntegerCode || ''
    const isDate = rules.isDate || false
    const isDateCode = rules.isDateCode || ''
    const isTime = rules.isTime || false
    const isTimeCode = rules.isTimeCode || ''
    const isDateTime = rules.isDateTime || false
    const isDateTimeCode = rules.isDateTimeCode || ''
    const isBoolean = rules.isBoolean || false
    const isBooleanCode = rules.isBooleanCode || ''
    const toInteger = rules.toInteger || false
    const toFloat = rules.toFloat || false
    const toBoolean = rules.toBoolean || false

    // value string treatment

    if (lowercase) {
      data = data.toLocaleLowerCase()
    }

    if (trim) {
      data = data.trim()
    }

    data = validator.stripLow(data)

    // value required
    if (isRequired && validator.isEmpty(data)) {
      const msgLang = ParamsValidator.__('{{field}} is required', {field: name})

      return new ErrorItem(
        {
          code: isRequiredCode,
          sourcePointer: source,
          message: msgLang
        }
      )
    }

    // value equals
    if (data.length > 0 && isEqual && !validator.equals(data, isEqual)) {
      const msgLang = ParamsValidator.__('{{field}} value is invalid', {field: name})

      return new ErrorItem(
        {
          code: isEqualCode,
          sourcePointer: source,
          message: msgLang
        }
      )
    }

    // value is in
    if (data.length > 0 && isIn && !validator.isIn(data, isIn)) {
      const msgLang = ParamsValidator.__('{{field}} value is invalid', {field: name})

      return new ErrorItem(
        {
          code: isInCode,
          sourcePointer: source,
          message: msgLang
        }
      )
    }

    // value max length
    if (data.length > 0 && maxLength && data.length > maxLength) {
      const msgLang = ParamsValidator.__('{{field}} format is invalid', {field: name})

      return new ErrorItem(
        {
          code: maxLengthCode,
          sourcePointer: source,
          message: msgLang
        }
      )
    }

    // is UUID
    if (data.length > 0 && isUUID && !validator.isUUID(data)) {
      const msgLang = ParamsValidator.__('{{field}} format is invalid', {field: name})

      return new ErrorItem(
        {
          code: isUUIDCode,
          sourcePointer: source,
          message: msgLang
        }
      )
    }

    // is integer
    if (data.length > 0 && isInteger && !validator.isInt(data)) {
      const msgLang = ParamsValidator.__('{{field}} format is invalid', {field: name})

      return new ErrorItem(
        {
          code: isIntegerCode,
          sourcePointer: source,
          message: msgLang
        }
      )
    }

    // is a positive integer
    if (data.length > 0 && isPositiveInteger && !validator.isInt(data, {gt: 0})) {
      const msgLang = ParamsValidator.__('{{field}} format is invalid', {field: name})

      return new ErrorItem(
        {
          code: isPositiveIntegerCode,
          sourcePointer: source,
          message: msgLang
        }
      )
    }

    // is date
    if (data.length > 0 && isDate) {
      const date = moment(data)
      if (!date.isValid()) {
        const msgLang = ParamsValidator.__('{{field}} format is invalid', {field: name})

        return new ErrorItem(
          {
            code: isDateCode,
            sourcePointer: source,
            message: msgLang
          }
        )
      }

      data = date.format('YYYY-MM-DD')
    }

    // is time
    if (data.length > 0 && isTime) {
      const time = moment(data, 'HH:mm:ss')
      if (!time.isValid()) {
        const msgLang = ParamsValidator.__('{{field}} format is invalid', {field: name})

        return new ErrorItem(
          {
            code: isTimeCode,
            sourcePointer: source,
            message: msgLang
          }
        )
      }

      data = time.format('HH:mm:ss')
    }

    // is date
    if (data.length > 0 && isDateTime) {
      const dateTime = moment(data)
      if (!dateTime.isValid()) {
        const msgLang = ParamsValidator.__('{{field}} format is invalid', {field: name})

        return new ErrorItem(
          {
            code: isDateTimeCode,
            sourcePointer: source,
            message: msgLang
          }
        )
      }

      data = dateTime.format()
    }

    // is boolean
    if (data.length > 0 && isBoolean && !validator.isBoolean(data)) {
      const msgLang = ParamsValidator.__('{{field}} format is invalid', {field: name})

      return new ErrorItem(
        {
          code: isBooleanCode,
          sourcePointer: source,
          message: msgLang
        }
      )
    }

    // no data
    if (param === null) return null

    // return integer
    if (toInteger) {
      return parseInt(data)
    }

    // return float
    if (toFloat) {
      return parseFloat(data)
    }

    // return boolean
    if (toBoolean) {
      return (data === 'true' || data === '1')
    }

    // reformatted data
    return data
  }

  static requireAtLeastOne (param1, param2, rules = {}) {
    const name1 = rules.name1 || 'param1'
    const name2 = rules.name2 || 'param2'
    const source = rules.source || 'body'
    const errorCode = rules.errorCode || ''

    param1 = param1 + ''
    param2 = param2 + ''

    if (validator.isEmpty(param1) && validator.isEmpty(param2)) {
      const msgLang = ParamsValidator.__('{{field1}} or {{field2}} is required', {field1: name1, field2: name2})

      return new ErrorItem(
        {
          code: errorCode,
          sourcePointer: source,
          message: msgLang
        }
      )
    }

    return false
  }

  static itemExists (param, rules = {}) {
    const name = rules.name || 'param'
    const source = rules.source || 'body'
    const errorCode = rules.errorCode || ''

    if (param === null) {
      const msgLang = ParamsValidator.__('{{field}} value is invalid', {field: name})

      return new ErrorItem(
        {
          code: errorCode,
          sourcePointer: source,
          message: msgLang
        }
      )
    }

    return true
  }
}

module.exports = ParamsValidator
