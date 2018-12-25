class StringHelpers {
  static escapeRegExp (str) {
    return str.replace(/([.*+?^=!:${}()|[\]/\\])/g, '\\$1')
  }

  static replaceAll (str, find, replace) {
    // eslint-disable-next-line security/detect-non-literal-regexp
    const regexp = new RegExp(StringHelpers.escapeRegExp(find), 'g')
    return str.replace(regexp, replace)
  }
}

module.exports = StringHelpers
