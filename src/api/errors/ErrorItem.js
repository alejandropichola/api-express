class ErrorItem {
  constructor ({code = '', sourcePointer = '', message = ''}) {
    this.code = code
    this.sourcePointer = sourcePointer
    this.message = message

    return this
  }
}

module.exports = ErrorItem
