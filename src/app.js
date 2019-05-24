
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const compression = require('compression')
const helmet = require('helmet')
const i18n = require('i18n')

require('app-module-path').addPath(__dirname)

const ErrorController = require('api/errors/ErrorExpress')
const RootController = require('api/root/RootExpress')
const UserController = require('api/users/UserExpress')
const MenuController = require('api/Menu/MenuExpress')
const UploadController = require('api/upload/UploadExpress')
const api = express()
api.use(bodyParser.json({limit: '6mb'}))
api.use(bodyParser.urlencoded({extended: true}))
api.use(cors())
api.use(compression())
api.use(helmet())

i18n.configure({
  locales: ['en', 'es'],
  defaultLocale: 'en',
  directory: path.join(__dirname, '/locales'),
  objectNotation: true
})

api.i18n = i18n

api.get('/', (req, res, next) => {
  return new RootController(api, req, res, next).getLinks()
})

// user
api.get('/users', (req, res, next) => {
  return new UserController(api, req, res, next).getUsers()
})
api.get('/users/:userId', (req, res, next) => {
  return new UserController(api, req, res, next).getUser()
})
api.post('/users', (req, res, next) => {
  return new UserController(api, req, res, next).addUser()
})
api.put('/users/:userId', (req, res, next) => {
  return new UserController(api, req, res, next).updateUser()
})
api.delete('/users/:userId', (req, res, next) => {
  return new UserController(api, req, res, next).deleteUser()
})
api.get('/menu', (req, res, next) => {
  return new MenuController(api, req, res, next).getMenu()
})
api.post('/upload', (req, res, next) => {
  return new UploadController(api, req, res, next).addUpload()
})
// route not found
api.use((req, res, next) => {
  return ErrorController.notFound()
})

// error catch all
api.use((err, req, res, next) => {
  return ErrorController.show(err, res)
})
// server
api.listen(3000, '192.168.86.47', () => console.log('http://192.168.86.47:3000'))
