const validator = require('validator');

const signupValidator = ({ name, email, password, refferalID }) => {
  const errors = {}

  if(!name) errors.name = "Name required."
  else if(name.length < 2) errors.name = "Name must be at lease 3 characters."
  else if(name.length > 55) errors.name = "Name isn't allowed upto 55 characters."

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Email isn't valid."

  if(!password) errors.password = "Password required."
  else if(password.length < 6) errors.password = "Password must be at least 6 characters."

  if(refferalID && typeof refferalID !== 'string') errors.refferalID = "Refferal ID isn't valid."

  return { errors, isValid: Object.keys(errors).length === 0}
}


const loginValidator = ({ email, password }) => {
  const errors = {}

  if(!email) errors.email = "Email required."
  else if(!validator.isEmail(email)) errors.email = "Email isn't valid."

  if(!password) errors.password = "Password required."

  return { errors, isValid: Object.keys(errors).length === 0}
}



module.exports = {
  signupValidator,
  loginValidator
}
