const Router = require('express').Router()
const config = require('config')
const jwt = require('jsonwebtoken');
const { BadRequest, Success } = require('../utils/customResponses')



Router.get('/',(req,res) => {
  res.send({
    user: '/api/user',
    admin: '/api/admin'
  })
})

Router.get('/refresh',(req,res) => {
  let token = req.header('etherpm_refresh_token');
  if(!token) return BadRequest(res,'Token required!')
  token = token.replace('Bearer ','')
  let decode = null
  let accessToken = null

  try{
    decode = jwt.verify(token,config.get('secretkey'));
    if(decode.tokenType !== 'refresh'){
      return BadRequest(res,"Refresh token expected!")
    }
  }catch(e){
    return BadRequest(res,e.message)
  }

  if(decode.header === 'etherpm-admin'){
    accessToken = jwt.sign({ _id: decode._id, tokenType: 'access',header: decode.header },config.get('secretkey'),{ expiresIn: '1h'})
  }else if(decode.header === 'etherpm-user'){
    accessToken = jwt.sign({ _id: decode._id, type: decode.type, tokenType: 'access',header: decode.header },config.get('secretkey'),{ expiresIn: '1h'})
  }else{
    return BadRequest(res,'header is not valid!')
  }

  return Success(res,accessToken)

})

module.exports = Router
