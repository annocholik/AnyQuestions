const { AnyQuestions } = require('./anyQuestions')

if (!AnyQuestions.types) {
  AnyQuestions.types = {}

  const fs = require('fs')
  fs.readdirSync(`${__dirname}/questionTypes`).forEach(file => {
    const key = file.substring(0, file.indexOf('.'))
    AnyQuestions.types[key] = require(`./questionTypes/${key}`)
  })
}

module.exports = { AnyQuestions }