const mongoose = require('mongoose')
const config = require('config')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')


const tokenSchema = new Schema({
  token:{
    type: String,
    required: true
  },
  createdAt:{
    type: Date,
    default: Date.now
  },
  userAgent: String
})

const userSchema = new Schema({
  name:{
    type: String,
    required: true,
    trim: true,
    max:55
  },
  email:{
    type: String,
    required: true,
    max: 255,
    unique: true
  },
  password:{
    type: String,
    required: true,
    max: 1000
  },
  refferalID:{
    type: String,
    trim: true,
    required: false,
    max: 1000
  },
  tokens:[tokenSchema]
})

userSchema.methods.getToken = function(){
  return 'Bearer '+jwt.sign({ _id: this._id },config.get('secretkey'),{ expiresIn: '7d'})
}


module.exports = mongoose.model('user',userSchema)
