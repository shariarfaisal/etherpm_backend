const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tokenListingSchema = new Schema({
  email:{
    type: String,
    required: true
  },
  name:{
    type: String,
    required: true,
    trim: true,
    max: 55
  },
  position:{
    type: String,
    required: true,
    trim: true,
    max: 100
  },
  tokenName:{
    type: String,
    required: true,
    trim: true,
    max: 16
  },
  symbol:{
    type: String,
    required: true,
    trim: true,
    max: 16
  },
  tokenDecimal:{
    type: String,
    required: true,
    trim: true,
    max: 18
  },
  tokenContract:{
    type: String,
    required: true,
    trim: true
  },
  websiteLink:{
    type: String,
    required: true,
    trim: true
  },
  description:{
    type: String,
    required: true,
    trim: true,
    max: 200
  },
  logoLink:{
    type: String,
    required: true,
    trim: true
  },
  exchanges:{
    type: String,
    required: true,
    trim: true
  },
  twitter:{
    type: String,
    trim: true,
    max: 255
  },
  telegram:{
    type: String,
    trim: true,
    max: 255
  },
  chat:{
    type: String,
    trim: true,
  },
  reddit:{
    type: String,
    trim: true,
    max: 1000
  },
  members:{
    type: String,
    trim: true,
    max: 1000
  },
  channel:{
    type: String,
    trim: true,
    max: 1000
  },
  refferedBy:{
    type: String,
    trim: true,
    max: 1000
  }
})

module.exports = mongoose.model('tokenlisting',tokenListingSchema)
