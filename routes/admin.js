const Router = require('express').Router()
const { login, signup, getProfile, getUsers, getUser, updateProfile, updatePassword, updateType } = require('../controllers/admin')
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


Router.post('/register',[adminAuth,isSuperAdmin],signup)
Router.post('/login',login)
Router.get('/profile',adminAuth,getProfile)
Router.get('/items',[adminAuth,isSuperAdmin],getUsers)
Router.get('/item/:id',[adminAuth,isSuperAdmin],getUser)
Router.put('/profile',adminAuth,updateProfile)
Router.put('/password',adminAuth,updatePassword)
Router.put('/type',[adminAuth,isSuperAdmin],updateType)

module.exports = Router
