module.exports = {
  '/' : {
    controller: 'IndexController',
    children: [
      { method: 'get', path: '/', action: 'index' }
    ]
  }
}
