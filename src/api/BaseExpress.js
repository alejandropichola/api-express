const PathHelper = require('../helpers/PathHelper')

class BaseController {
  constructor (api, req, res, next) {
    this.api = api
    this.req = req
    this.res = res
    this.next = next

    this._initBase()

    return this
  }

  __ (phrase, args) {
    const locale = this.api.i18n.getLocale()

    return this.api.i18n.__(
      {
        phrase: phrase,
        locale: locale
      },
      args
    )
  }

  _initBase () {
    this.path = ''
    this.lang = 'en'
    this.include = ''
  }

  _getBaseParameters () {
    this.path = this.req.protocol + '://' +
      this.req.get('host') +
      this.req.baseUrl + '/'

    this.lang = this.req.header('Lang') || this.req.query.lang || 'en'
    this.lang = PathHelper.langParam(this.lang)
    this.api.i18n.setLocale(this.lang)

    this.include = this.req.query.include || ''
    this.include = PathHelper.includeParam(this.include)
  }
}

module.exports = BaseController
