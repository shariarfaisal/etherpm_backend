const Router = require('express').Router()
const { login, signup, getProfile, getUsers, getUser, updateProfile, updatePassword } = require('../controllers/user')
const userAuth = require('../middlewares/userAuth')
const { adminAuth, isSuperAdmin } = require('../middlewares/adminAuth')

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
Router.get('/items',[adminAuth, isSuperAdmin],getUsers)
Router.get('/item/:id',[adminAuth, isSuperAdmin],getUser)
Router.put('/profile',userAuth,updateProfile)
Router.put('/password',userAuth,updatePassword)

module.exports = Router
