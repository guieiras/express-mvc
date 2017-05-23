const express = require('express')

const dispatch = require('./dispatcher')().dispatch
const routes = require('../src/routes')

module.exports = function(app) {
  Object.keys(routes).forEach((route) => {
    let router = express.Router()
    let base = routes[route]

    base.children.forEach((child) => {
      router[child.method](child.path, (req, res) => {
        dispatch(base.controller, child.action, req, res)
      })
    })

    app.use(route, router)
  })

  return app
}

