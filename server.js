/* External imports */
const express = require('express')
const chalk   = require('chalk')
require('dotenv').config()

/* Internal imports */
const middleware = require('./config/middleware')

/* Setting app */
let app = middleware(express())

app.set('port', process.env.PORT)

app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'))
  console.log('  Press CTRL-C to stop\n')
})
