class Links {
  static getLinks (path = '/', lang = 'en') {
    return {
      'links': {
        'users': `${path}/users?lang=${lang}`
      }
    }
  }
}

module.exports = Links
