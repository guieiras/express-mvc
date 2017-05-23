module.exports = class BaseController {
  constructor(req, res) {
    this.request = req
    this.response = res
    this.vars = {}
  }

  get params() {
    return Object.assign({}, this.request.body, this.request.params)
  }

  render(view) {
    this.response.render(view, this.vars)
  }

  setVar(key, value) {
    this.vars[key] = value
  }

  sendStatus(status) {
    this.response.sendStatus(status)
  }

  parametrize(keys) {
    if (Array.isArray(keys)) {
      let obj = {}
      keys.forEach((el) => {
        obj[el] = this.params[el]
      })

      return obj
    }
    else {
      throw 'Unexpected params: paramatrize needs to receive an Array'
    }
  }
}
