const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')


module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(morgan('dev'))
}
