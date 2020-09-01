const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')
const { signupValidator, loginValidator, updateValidator } = require('../validators/admin')
const { Success, BadRequest, NotFound, DataFound, DataCreated, ValidationError, LoginSuccess, ServerError } = require('../utils/customResponses')
const { isIdValid } = require('../utils/helpers')

const login = async (req,res) => {
  const { username, password } = req.body;

  /* Credentials validation */
  const { errors, isValid } = loginValidator(req.body)
  if(!isValid) return ValidationError(res,errors)

  /* Check User Existence */
  const admin = await Admin.findOne().or([
    { email: username },
    { username }
  ])
  if(!admin) return BadRequest(res,{msg: 'Invalid credentials!'})

  /* Check Password Validation */
  const validPassword = await bcrypt.compare(password,admin.password)
  if(!validPassword) return BadRequest(res,{msg: 'Invalid credentials!'})

  // Get Return Authentication Token
  return LoginSuccess(res,admin.getToken())
}

const signup = async (req,res) => {
  const { name, username, contact, email, type, password } = req.body

  /* admin data validation */
  const { errors, isValid } = signupValidator(req.body)
  if(!isValid) return ValidationError(res,errors)

  /* Checking emial existence */
  const emailExists = await Admin.findOne({ email });
  if(emailExists) return BadRequest(res,{ email: "Email already exists!"})

  /* Checking username existence */
  const usernameExists = await Admin.findOne({ username });
  if(usernameExists) return BadRequest(res,{ username: "Username taken!"})

  /* Create new admin */
  let admin = new Admin({ name, username, email, contact, type, password })

  /* Hashing Password */
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(admin.password,salt);

  /* It's time to save admin data into database */
  admin = await admin.save();
  if(!admin) return ServerError(res,{msg: 'Something wrong!'})
  return DataCreated(res,admin)
}

const getProfile = async (req,res) => {
  const admin = await Admin.findById(req.admin._id).select(' -password ')
  if(!admin) return NotFound(res,'Admin not found!')
  return Success(res,admin)
}

const getUsers = async (req,res) => {
  const users = await Admin.find().select(' -password ')
  if(!users) return ServerError(res,{msg: 'Something wrong!'})
  return Success(res,users)
}

const getUser = async (req,res) => {
  /* Admin ID validation */
  if(!isIdValid(req.params.id)) return ValidationError(res,'Admin ID is not valid.')

  /* Get Admin By ID */
  const admin = await Admin.findById(req.params.id).select(' -password ')
  if(!admin) return NotFound(res,'Not Found!')
  return Success(res,admin)
}

const updateProfile = async (req,res) => {
  const { errors, isValid } = updateValidator(req.body)
  if(!isValid) return ValidationError(res,errors)

  const admin = await Admin.findById(req.admin._id)
  if(!admin) return NotFound(res,'Not found!')

  const { name, username, email, contact } = req.body

  if(admin.email !== email){
    const emailExists = await Admin.findOne({ email })
    if(emailExists) return ValidationError(res,{email: "Email already exists."})
  }

  if(admin.username !== username){
    const usernameExists = await Admin.findOne({ username })
    if(usernameExists) return ValidationError(res,{username: "Username taken."})
  }

  const getUpdate = await Admin.findByIdAndUpdate(req.admin._id,{$set:{ name, username, email, contact }},{new: true}).select(' -password ')
  if(!getUpdate) return ServerError(res,getUpdate.message)

  return Success(res,getUpdate)
}

const updatePassword = async (req,res) => {
  const { password, newPassword } = req.body

  const error = {}
  if(!password) error.password = "Old Password must not be empty!"
  if(!newPassword) error.newPassword = "New Password must not be empty."
  else if(newPassword.length < 6) error.newPassword = "Password must be at least 6 characters."

  if(Object.keys(error).length !== 0) return ValidationError(res,error)

  const admin = await Admin.findById(req.admin._id)
  if(!admin) return NotFound(res,"Not found!")

  const oldPassIsValid = await bcrypt.compare(password,admin.password)
  if(!oldPassIsValid){
    return ValidationError(res,{password: "Password isn't valid!"})
  }

  if(password === newPassword) return ValidationError(res,{newPassword: "Old Password isn't allowed as New Password!"})

  admin.password = await bcrypt.hash(newPassword,10)
  await admin.save()
  return Success(res,admin)
}

const updateType = async (req,res) => {
  const { type, userId } = req.body

  let error = ""
  if(!userId) error = "userId required!"
  else if(!isIdValid(userId)) error = "Invalid ID!"
  else if(userId == req.admin._id) error = "Self type changeing isn't allowed!"
  else if(['SuperAdmin','Admin'].includes(type)) error = "Invalid type!"

  if(error) return ValidationError(res,error)

  let user = await Admin.findById(userId)
  if(!user) return NotFound(res,"Not Found!")
  user.type = type
  user = await user.save()
  return Success(res,user)
}


module.exports = {
  login,
  signup,
  getProfile,
  getUsers,
  getUser,
  updateProfile,
  updatePassword,
  updateType
}
