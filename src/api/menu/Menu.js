const Models = require('../../models/index')

class Menu {
  static getOptionMenu () {
    return Models.MenuOption.findAll({
      attributes: [
        'id',
        'name_component',
        'option_father',
        'description',
        'icon',
        'enabled'
      ]
    })
  }
  static formatMenu (menu = [], path = '/') {
    const dataMenu = []
    menu.forEach(item => {
      const data = Menu.formatMenuOption(item, path)
      dataMenu.push(data)
    })

    const response = {
      type: 'menu',
      data: dataMenu,
      path: {
        self: `${path}menu`
      }
    }
    return response
  }
  static formatMenuOption (menuOption, path = '') {
    const id = menuOption ? menuOption.id : null
    const nameComponent = menuOption ? menuOption.get('name_component') : null
    const optionFather = menuOption ? menuOption.get('option_father') : null
    const description = menuOption ? menuOption.description : null
    const icon = menuOption ? menuOption.icon : null
    const enabled = menuOption ? menuOption.enabled : true
    const response = {
      type: 'users',
      menuOption: id,
      attributes: {
        nameComponent: nameComponent,
        optionFather: optionFather,
        description: description,
        icon: icon,
        enabled: enabled
      },
      path: {
        self: `${path}menu/${id}`
      }
    }
    return response
  }
  static getMenuItems (permission) {
    return Models.MenuOption.findAll({
      attributes: [
        'id',
        'name_component',
        'option_father',
        'description',
        'icon',
        'permission',
        'enabled'
      ],
      where: {
        permission: permission
      }
    })
  }
}

module.exports = Menu
