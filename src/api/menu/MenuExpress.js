const BaseAuthController = require('../BaseAuthExpress')
const Menu = require('./Menu')

class MenuController extends BaseAuthController {
  constructor (api, req, res, next) {
    super(api, req, res, next)

    return this
  }

  _reset () {
    this._initBase()
    this._initBaseAuth()
  }

  getMenu () {
    this._reset()
    return Promise
      .resolve()
      .then(() => {
        return Menu.getOptionMenu()
      })
      .then((response) => {
        return this._response(response)
      })
      .catch(this.next)
  }

  _response (menu) {
    const data = Menu.formatMenu(menu, this.path)
    return this.res.json(data)
  }
}

module.exports = MenuController
