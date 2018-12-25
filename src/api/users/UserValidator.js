const Validator = require('validator')
const ErrorItem = require('../errors/ErrorItem')
const ErrorCodes = require('../../config/ErrorCodes')
class UserValidator {
  static validateName (self) {
    const firstName = self.firstName
    if (firstName !== null && firstName.length > 0) return self.firstName
    const msLang = self.__('{{field}} is required', {field: 'type'})

    self.errors.push(
      new ErrorItem(
        {
          code: ErrorCodes['TYPE_REQUIRED'].toString(),
          sourcePointer: '/body/data/type',
          message: msLang
        }
      )
    )
  }
  static validateEmail (o) {
    o.email = o.email + ''
    o.email = o.email.toLowerCase().trim()

    o.email = Validator.stripLow(o.email)

    if (Validator.isEmpty(o.email)) {
      const msgLang = o.__('{{field}} is required', { field: 'email' })

      o.errors.push(
        new ErrorItem(
          {
            code: ErrorCodes['USER_EMAIL_REQUIRED'].toString(),
            sourcePointer: '/body/data/email',
            message: msgLang
          }
        )
      )

      return
    }

    if (!Validator.isEmail(o.email)) {
      const msgLang = o.__('{{field}} format is invalid', { field: 'email' })

      o.errors.push(
        new ErrorItem(
          {
            code: ErrorCodes['USER_EMAIL_INVALID'].toString(),
            sourcePointer: '/body/data/email',
            message: msgLang
          }
        )
      )
    }
  }
  static validatePassword (o) {
    o.password = o.password + ''
    o.password = o.password.trim()

    o.password = Validator.stripLow(o.password)

    if ((!o.doctor || o.doctorPatient.length <= 0) && (!o.facebookId || o.facebookId.length <= 0) && (!o.gPlusId || o.gPlusId.length <= 0)) {
      if (Validator.isEmpty(o.password)) {
        const msgLang = o.__('{{field}} is required', { field: 'password' })

        o.errors.push(
          new ErrorItem(
            {
              code: ErrorCodes['USER_PASSWORD_REQUIRED'].toString(),
              sourcePointer: '/body/data/password',
              message: msgLang
            }
          )
        )
      }
    }
  }
  static validateUserId (o) {
    o.userId = o.userId + ''
    o.userId = o.userId.trim()

    o.userId = Validator.stripLow(o.userId)

    if (Validator.isEmpty(o.userId)) {
      const msgLang = o.__('{{field}} is required', { field: 'userId' })

      o.errors.push(
        new ErrorItem(
          {
            code: ErrorCodes['USER_ID_REQUIRED'].toString(),
            sourcePointer: '/param/data/userId',
            message: msgLang
          }
        )
      )
    }
  }
  static validateFirstName (o) {
    o.firstName = o.firstName + ''
    o.firstName = o.firstName.trim()

    o.firstName = Validator.stripLow(o.firstName)

    if (Validator.isEmpty(o.firstName)) {
      const msgLang = o.__('{{field}} is required', { field: 'firstName' })

      o.errors.push(
        new ErrorItem(
          {
            code: ErrorCodes['USER_FIRST_NAME_REQUIRED'].toString(),
            sourcePointer: '/body/data/firstName',
            message: msgLang
          }
        )
      )
    }
  }
  static validateGender (o) {
    o.gender = o.gender + ''
    o.gender = o.gender.toLowerCase().trim()

    o.gender = Validator.stripLow(o.gender)

    if (o.gender.length > 0 && !Validator.isIn(o.gender, ['male', 'female'])) {
      const msgLang = o.__('{{field}} format is invalid', { field: 'gender' })

      o.errors.push(
        new ErrorItem(
          {
            code: ErrorCodes['USER_GENDER_INVALID'].toString(),
            sourcePointer: '/body/meta/gender',
            message: msgLang
          }
        )
      )

      return
    }

    o.gender = o.gender === 'female' ? 'F' : 'M'
  }
  static validateBirthDate (o) {
    o.birthDate = o.birthDate + ''
    o.birthDate = o.birthDate.trim()

    o.birthDate = Validator.stripLow(o.birthDate)

    if (o.birthDate.length > 0 && !Validator.isISO8601(o.birthDate)) {
      const msgLang = o.__('{{field}} format is invalid', { field: 'birthDate' })

      o.errors.push(
        new ErrorItem(
          {
            code: ErrorCodes['USER_BIRTH_DATE_INVALID'].toString(),
            sourcePointer: '/body/data/birthDate',
            message: msgLang
          }
        )
      )

      return
    }

    if (o.birthDate.length <= 0) {
      o.birthDate = null
    }
  }
  static validateLastName (self) {
    const lastName = self.lastName
    if (lastName !== null && lastName.length > 0) return self.lastName
    const msLang = self.__('{{field}} is required', {field: 'lastName'})

    self.errors.push(
      new ErrorItem(
        {
          code: ErrorCodes['TYPE_REQUIRED'].toString(),
          sourcePointer: '/body/data/type',
          message: msLang
        }
      )
    )
  }
}

module.exports = UserValidator
