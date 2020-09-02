const TokenListing = require('../models/TokenListing')
const { Success, BadRequest, NotFound, DataFound, DataCreated, ValidationError, LoginSuccess, ServerError } = require('../utils/customResponses')
const { createValidator } = require('../validators/tokenListing')
const { isIdValid } = require('../utils/helpers')


const createTokenListing = async (req,res) => {
  const {
    email, name, position, tokenName,
    symbol, tokenDecimal, tokenContract, websiteLink,
    description, logoLink, exchanges,
    twitter, telegram, chat, reddit, members,
    channel, refferedBy
  } = req.body

  const { errors, isValid } = createValidator(req.body)
  if(!isValid) return ValidationError(res,errors)

  const tokenListing = new TokenListing({
    email, name, position, tokenName,
    symbol, tokenDecimal, tokenContract, websiteLink,
    description, logoLink, exchanges,
    twitter, telegram, chat, reddit, members,
    channel, refferedBy
  })

  try{
    await tokenListing.save()
    return Success(res,tokenListing)
  }catch(err){
    return ServerError(res,err.message)
  }
}

const getTokenListings = async (req,res) => {
  try{
    const lists = await TokenListing.find()
    return Success(res,lists)
  }catch(err){
    return ServerError(res,err.message)
  }
}

const tokenListingById = async (req,res) => {
  if(!isIdValid(req.params.id)) return ValidationError(res,"Invalid ID.")

  const get = await TokenListing.findById(req.params.id)
  if(!get) return NotFound(res,"Not Found.")
  return Success(res,get)
}

const deleteTokenListing = async (req,res) => {
  if(!isIdValid(req.params.id)) return ValidationError(res,"Invalid ID.")

  const getDelete = await TokenListing.findByIdAndDelete(req.params.id)
  if(!getDelete) return NotFound(res,"Not found.")
  return Success(res,getDelete)
}

module.exports = {
  createTokenListing,
  getTokenListings,
  tokenListingById,
  deleteTokenListing
}
