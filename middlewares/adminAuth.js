const config = require('config')
const jwt = require('jsonwebtoken');
const { AuthenticationError, BadRequest, NotFound } = require('../utils/customResponses')
const Admin = require('../models/Admin')

const adminAuth = (req,res,next) => {
  let token = req.header('x-admin-token');
  if(!token) return AuthenticationError(res,'You are not authenticated!')
  token = token.replace('Bearer ','')
  try{
    const decoded = jwt.verify(token,config.get('secretkey'));
    req.admin = decoded;
    next();
  }catch(e){
    return BadRequest(res,e.message)
  }
}

const isSuperAdmin = async (req,res,next) => {
  const user = await Admin.findById(req.admin._id)
  if(!user) return NotFound(res,"Not Found!")
  if(user.type !== 'SuperAdmin') return BadRequest(res,"You are not authorized!")
  next()
}

module.exports = {
  adminAuth,
  isSuperAdmin
}
