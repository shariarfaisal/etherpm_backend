const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { signupValidator, loginValidator } = require('../validators/user')
const { Success, BadRequest, NotFound, DataFound, DataCreated, ValidationError, LoginSuccess } = require('../utils/customResponses')
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
  const { name, email, password, confirmPassword, refferalID } = req.body

  /* User data validation */
  const { errors, isValid } = signupValidator(req.body)
  if(!isValid) return ValidationError(res,errors)

  /* Checking emial existence */
  const emailExists = await User.findOne({ email });
  if(emailExists) return BadRequest(res,{ email: "Email taken!"})

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
  return DataFound(res,user)
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
  return DataFound(res,user)
}

module.exports = {
  login,
  signup,
  getProfile,
  getUsers,
  getUser,
}
