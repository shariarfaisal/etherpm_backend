const Router = require('express').Router()

Router.get('/',(req,res) => {
  res.send({
    user: '/api/user'
  })
})

module.exports = Router
