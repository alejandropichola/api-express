const moment = require('moment')

class DateHelper {
  static getDate (date) {
    if (!date || date.length <= 0) {
      return ''
    }

    return moment.utc(date).format('YYYY-MM-DD')
  }
  static getDateReformat (date) {
    if (!date || date.length <= 0) return ''

    return moment.utc(date).locale('es').format('ddd D/MMM/YYYY')
  }
  static getDateTime (dateTime) {
    if (!dateTime || dateTime.length <= 0) {
      return ''
    }

    let format = moment(dateTime)

    if (!format.isValid()) {
      return ''
    }

    return format.format()
  }
}

module.exports = DateHelper
