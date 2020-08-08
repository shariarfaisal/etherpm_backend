const config = require('config')
const jwt = require('jsonwebtoken');
const { AuthenticationError, BadRequest } = require('../utils/customResponses')


const userAuth = (req,res,next) => {
  const token = req.header('etherpm_user_token');
  if(!token) return AuthenticationError(res,'You are not authenticated!')
  try{
    const decoded = jwt.verify(token,config.get('secretkey'));
    req.user = decoded;
    next();
  }catch(e){
    return BadRequest(res,e.message)
  }
}

module.exports = userAuth
