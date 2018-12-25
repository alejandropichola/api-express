class PathHelper {
  static langParam (lang) {
    lang = lang.toLowerCase().trim()

    switch (lang) {
      case 'en':
      case 'es':
        break
      default:
        lang = 'en'
    }

    return lang
  }

  static includeParam (include) {
    return include.replace(' ', '').toLowerCase().trim()
  }
}

module.exports = PathHelper
