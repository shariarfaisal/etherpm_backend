const validator = require('validator');
const typeEnums = ['Admin','SuperAdmin']

const signupValidator = ({ name, username, contact, type, email, password }) => {
  const errors = {}

  if(!name) errors.name = "Name required."
  else if(name.length < 2) errors.name = "Name must be at lease 3 characters."
  else if(name.length > 55) errors.name = "Name isn't allowed upto 55 characters."

  if(!username) errors.username = "Username required."
  else if(username.length < 2) errors.username = "Username must be at lease 3 characters."
  else if(username.length > 55) errors.username = "Username isn't allowed upto 55 characters."

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Email isn't valid."

  if(!password) errors.password = "Password required."
  else if(password.length < 6) errors.password = "Password must be at least 6 characters."

  if(!contact) errors.contact = "Contact number required!"

  if(!type) errors.type = "Type required!"
  else if(!typeEnums.includes(type)) errors.type = "Invalid type!"

  return { errors, isValid: Object.keys(errors).length === 0}
}


const loginValidator = ({ username, password }) => {
  const errors = {}

  if(!username) errors.username = "Username required."
  // else if(!validator.isEmail(email)) errors.email = "Email isn't valid."

  if(!password) errors.password = "Password required."

  return { errors, isValid: Object.keys(errors).length === 0}
}

const updateValidator = ({ name, email, username, contact }) => {
  const errors = {}

  if(!name) errors.name = "Name required."
  else if(name.length < 2) errors.name = "Name must be at lease 3 characters."
  else if(name.length > 55) errors.name = "Name isn't allowed upto 55 characters."

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Email isn't valid."

  if(!username) errors.username = "Username required."
  else if(username.length < 2) errors.username = "Username must be at lease 3 characters."
  else if(username.length > 55) errors.username = "Username isn't allowed upto 55 characters."

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Email isn't valid."

  if(!contact) errors.contact = "Contact number required!"

  return { errors, isValid: Object.keys(errors).length === 0}
}



module.exports = {
  signupValidator,
  loginValidator,
  updateValidator
}
