const Router = require('express').Router()
const { login, signup, getProfile, getUsers, getUser } = require('../controllers/user')
const userAuth = require('../middlewares/userAuth')

Router.get('/',(req,res) => {
  res.send({
    register: '/register',
    login: '/login',
    profile: '/profile',
    users: '/items',
    user: '/item/{userid}'
  })
})

Router.post('/register',signup)
Router.post('/login',login)
Router.get('/profile',userAuth,getProfile)
Router.get('/items',getUsers)
Router.get('/item/:id',getUser)

module.exports = Router
