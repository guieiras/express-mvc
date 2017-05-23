/* IMPORTS */
let bodyParser     = require('body-parser')
let express        = require('express')
let path           = require('path')
let session        = require('express-session')
let compression    = require('compression')
let sassMiddleware = require('node-sass-middleware');
let models         = require('../config/models')
let router         = require('../config/router')

module.exports = function(app) {
  app = router(app)

  if (global.PROD_ENV) {
    app.use(compression())
  }

  app.use(bodyParser.json())

  app.use(bodyParser.urlencoded({
    extended: true,
  }))

  app.use(session({
    secret: process.env.APP_SECRET,
    saveUninitialized: true,
    resave: true,
  }))
  
  app.use(
    sassMiddleware({
      src: path.join(__dirname, '..', 'assets', 'sass'),
      dest: path.join(__dirname, '../dist/stylesheets'),
      prefix:  '/stylesheets',
      indentedSyntax: true
    })
  )
  app.use(express.static('/stylesheets'))
  
  app.set('models', models)
  app.set('views', path.join(__dirname, '../src/views'))
  app.set('view engine', 'pug')
  app.use(express.static(path.join(__dirname, '../public')))
  app.use((request, response) => {
    response.status(404)
    response.render('global/404')
  })

  return app
}
