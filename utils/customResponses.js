

const BadRequest = (res,error) => {
  res.status(400).send({
    message: 'Bad Request!',
    status: 400,
    error
  })
}

const NotFound = (res,error) => {
  res.status(404).send({
    message: 'Not Found!',
    status: 404,
    error
  })
}

const LoginSuccess = (res,token) => {
  res.status(200).send({
    message: 'Ok!',
    status: 200,
    token
  })
}

const ValidationError = (res,error) => {
  res.status(406).send({
    message: 'Validation Error!',
    status: 406,
    error
  })
}

const ServerError = (res,error) => {
  res.status(500).send({
    message: 'Server Error!',
    status: 500,
    error
  })
}

const AuthenticationError = (res,error) => {
  res.status(401).send({
    message: 'Authentication Error!',
    status: 401,
    error
  })
}

const DataFound = (res,data) => {
  res.status(302).send({
    message: 'Data Found!',
    status: 302,
    data
  })
}

const DataCreated = (res,data) => {
  res.status(201).send({
    message: 'Data Created!',
    status: 201,
    data
  })
}

const Success = (res,data) => {
  res.status(200).send({
    message: 'Ok!',
    status: 200,
    data
  })
}

module.exports = {
  Success,
  BadRequest,
  LoginSuccess,
  ValidationError,
  ServerError,
  AuthenticationError,
  DataFound,
  DataCreated,
  NotFound
}
