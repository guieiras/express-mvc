const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
                    process.env.DB_DATABASE,
                    process.env.DB_USERNAME,
                    process.env.DB_PASSWORD,
                    {
                      host: process.env.DB_HOST,
                      dialect: 'postgres'
                    })
const modelsDir = path.join(__dirname, '..', 'src', 'models')
const db = {}

fs.readdirSync(modelsDir).filter((file) => {
  let isVisible = file.indexOf('.') !== 0
  let isAnotherFile = file !== path.basename(module.filename)
  let isJs = file.slice(-3) === '.js'

  return isVisible && isAnotherFile && isJs
}).forEach((file) => {
  let model = sequelize['import'](path.join(modelsDir, file))

  db[model.name] = model
})

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
