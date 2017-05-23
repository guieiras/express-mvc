const BaseController = require('./BaseController')

module.exports = class IndexController extends BaseController {
  index() {
    this.render('index')
  }
}
