const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')

const Root = require('../routes/root')
const User = require('../routes/user')
const Admin = require('../routes/admin')
const TokenListing = require('../routes/tokenListing')

module.exports = (app) => {
  app.use(cors())
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(morgan('dev'))

  app.use('/api',Root)
  app.use('/api/user',User)
  app.use('/api/admin',Admin)
  app.use('/api/token-listing',TokenListing)
}
