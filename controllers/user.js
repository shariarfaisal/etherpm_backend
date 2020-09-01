const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { signupValidator, loginValidator, updateValidator } = require('../validators/user')
const { Success, BadRequest, NotFound, DataFound, DataCreated, ValidationError, LoginSuccess, ServerError } = require('../utils/customResponses')
const { isIdValid } = require('../utils/helpers')

const login = async (req,res) => {
  const { email, password } = req.body;

  /* Credentials validation */
  const { errors, isValid } = loginValidator(req.body)
  if(!isValid) return ValidationError(res,errors)

  /* Check User Existence */
  const user = await User.findOne({ email })
  if(!user) return BadRequest(res,'Invalid credentials!')

  /* Check Password Validation */
  const validPassword = await bcrypt.compare(password,user.password)
  if(!validPassword) return BadRequest(res,'Invalid credentials!')

  // Get Return Authentication Token
  return LoginSuccess(res,user.getToken())
}

const signup = async (req,res) => {
  const { name, email, password, refferalID } = req.body

  /* User data validation */
  const { errors, isValid } = signupValidator(req.body)
  if(!isValid) return ValidationError(res,errors)

  /* Checking emial existence */
  const emailExists = await User.findOne({ email });
  if(emailExists) return BadRequest(res,{ email: "Email already exists!"})

  /* Create new user */
  let user = new User({ name, email, password, refferalID: refferalID ? refferalID : '', tokens: [] })

  /* Hashing Password */
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password,salt);

  /* It's time to save user data into database */
  user = await user.save();

  return DataCreated(res,user)
}

const getProfile = async (req,res) => {
  const user = await User.findById(req.user._id).select(' -password ')
  if(!user) return NotFound(res,'User not found!')
  return Success(res,user)
}

const getUsers = async (req,res) => {
  const users = await User.find().select(' -password ')
  return Success(res,users)
}

const getUser = async (req,res) => {
  /* User ID validation */
  if(!isIdValid(req.params.id)) return ValidationError(res,'User ID is not valid.')

  /* Get User By ID */
  const user = await User.findById(req.params.id).select(' -password ')
  if(!user) return NotFound(res,'Not Found!')
  return Success(res,user)
}


const updateProfile = async (req,res) => {
  const { errors, isValid } = updateValidator(req.body)
  if(!isValid) return ValidationError(res,errors)

  const user = await User.findById(req.user._id)
  if(!user) return NotFound(res,'User not found!')

  const { email, name} = req.body

  if(user.email !== email){
    const emailExists = await User.findOne({ email })
    if(emailExists) return ValidationError(res,{email: "Email already exists."})
  }

  const getUpdate = await User.findByIdAndUpdate(req.user._id,{$set:{ email, name }},{new: true}).select(' -password ')
  if(!getUpdate) return ServerError(res,getUpdate.message)

  return Success(res,getUpdate)
}

const updatePassword = async (req,res) => {
  const { password, newPassword } = req.body

  const error = {}
  if(!newPassword) error.newPassword = "Password required!"
  else if(newPassword.length < 6) error.newPassword = "Password must be at least 6 characters."

  if(Object.keys(error).length !== 0) return ValidationError(res,error)

  const user = await User.findById(req.user._id)
  if(!user) return NotFound(res,"User not found!")

  const oldPassIsValid = await bcrypt.compare(password,user.password)
  if(!oldPassIsValid){
    return ValidationError(res,{password: "Password isn't valid!"})
  }

  if(password === newPassword) return ValidationError(res,{newPassword: "Old Password isn't allowed as New Password!"})

  user.password = await bcrypt.hash(newPassword,10)
  await user.save()
  return Success(res,user)
}


module.exports = {
  login,
  signup,
  getProfile,
  getUsers,
  getUser,
  updateProfile,
  updatePassword
}
