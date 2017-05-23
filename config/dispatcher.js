const fs = require('fs')
const path = require('path')
const controllersDir = path.join(__dirname, '..', 'src', 'controllers')

module.exports = function() {
  const controllers = {}

  fs.readdirSync(controllersDir).filter((file) => {
    let isVisible = file.indexOf('.') !== 0
    let isController = file.slice(-13) === 'Controller.js'

    return isVisible && isController
  }).forEach((file) => {
    let controller = require(path.join(controllersDir, file))

    controllers[file.slice(0, -3)] = controller
  })

  const dispatch = function(controller, action, req, res) {
    return new controllers[controller](req, res)[action]()
  }

  return { dispatch }
}
