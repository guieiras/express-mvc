const BaseController = require('./BaseController')

module.exports = class IndexController extends BaseController {
  index() {
    this.setVar('hello', 'Hi!')
    this.render('index')
  }
}
