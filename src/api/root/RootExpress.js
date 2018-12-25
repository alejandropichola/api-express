const Links = require('./Links')

const BaseController = require('../BaseExpress')

class RootController extends BaseController {
  constructor (api, req, res, next) {
    super(api, req, res, next)

    this._init()

    return this
  }

  _init () {
    this.links = null
  }

  _reset () {
    this._initBase()

    this._init()
  }

  getLinks () {
    this._reset()

    return Promise
      .resolve()
      .then(() => {
        return this._getParameters()
      })
      .then(() => {
        return this._getContent()
      })
      .then(() => {
        return this._response()
      })
      .catch(this.next)
  }

  _getParameters () {
    this._getBaseParameters()
  }

  _getContent () {
    this.links = Links.getLinks(this.path, this.lang)
  }

  _response () {
    this.res.json(this.links)
  }
}

module.exports = RootController
