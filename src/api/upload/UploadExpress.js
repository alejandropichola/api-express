const BaseAuthController = require('../BaseAuthExpress')
const BadParametersException = require('../../exceptions/BadParametersException')
const Printer = require('pdfmake/src/printer')
const uuid = require('uuid/v4')
const path = require('path')
const fs = require('fs')

class UploadController extends BaseAuthController {
  constructor (api, req, res, next) {
    super(api, req, res, next)

    this._init()
    return this
  }

  _init () {
    this.bodyImage = null
    this.mimeType = null
    this.errors = []
  }

  _reset () {
    this._initBase()
    this._initBaseAuth()
    this._init()
  }

  addUpload () {
    this._reset()
    return Promise
      .resolve()
      .then(() => {
        return this._getParameters()
      })
      .then(() => {
        return this._definitionPdf()
      })
      .then(() => {
        this._response()
      })
      .catch(this.next)
  }

  _definitionPdf () {
    const mimeType = this.mimeType
    const imageBase = mimeType + ',' + this.bodyImage
    const definition = {
      content: [
        {
          image: imageBase
        }
      ]
    }
    const printer = new Printer({
      Roboto: {
        normal: path.join(__dirname, '../../fonts/fonts_Roboto-Regular.ttf'),
        bold: path.join(__dirname, '../../fonts/fonts_Roboto-Medium.ttf'),
        italics: path.join(__dirname, '../../fonts/fonts_Roboto-Italic.ttf'),
        bolditalics: path.join(__dirname, '../../fonts/fonts_Roboto-MediumItalic.ttf')
      }
    })
    return new Promise((resolve, reject) => {
      const doc = printer.createPdfKitDocument(definition)
      doc.pipe(
        fs.createWriteStream('uploads/' + uuid() + '.pdf').on('error', (err) => {
          console.error(err)
        })
      )
      doc.on('end', () => {
        const response = 'success'
        resolve(response)
      })
      doc.end()
    })
      .catch(err => {
        throw err
      })
  }

  _getParameters () {
    return Promise
      .resolve()
      .then(() => {
        this._getBaseAuthParameters()
        this._requireJSON()
      })
      .then(() => {
        this.req.body.data = this.req.body.data || {}
        this.req.body.data.attributes = this.req.body.data.attributes || {}
        this._getBodyImage()
        this._getMimeType()
        if (this.errors.length > 0) {
          throw new BadParametersException(this.errors)
        }
      })
      .catch((err) => {
        throw err
      })
  }

  _getBodyImage () {
    this.bodyImage = this.req.body.data.attributes.bodyImage || ''
    console.log(this.bodyImage)
  }

  _getMimeType () {
    this.mimeType = this.req.body.data.attributes.mimeType || ''
    console.log(this.mimeType)
  }

  _response () {
    const response = {
      'response': 'ok'
    }
    this.res.json(response)
  }
}

module.exports = UploadController
