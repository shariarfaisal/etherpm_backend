const mongoose = require('mongoose')
const config = require('config')
const Schema = mongoose.Schema
const jwt = require('jsonwebtoken')


const adminSchema = new Schema({
  name:{
    type: String,
    required: true,
    trim: true,
    max:55
  },
  username:{
    type: String,
    required: true,
    trim: true,
    max:55,
    unique: true
  },
  email:{
    type: String,
    required: true,
    max: 255,
    unique: true
  },
  type:{
    type: String,
    enum:['Admin','SuperAdmin'],
    default: 'Admin'
  },
  contact:{
    type: String,
    required: true,
    max: 255
  },
  password:{
    type: String,
    required: true,
    max: 1000
  }
})

adminSchema.methods.getToken = function(){
  return 'Bearer '+jwt.sign({ _id: this._id, type: this.type},config.get('secretkey'),{ expiresIn: '7d'})
}


module.exports = mongoose.model('admin',adminSchema)
