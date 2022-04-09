const HTTP_STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
  }

  const Role = {
    ADMIN: 'admin',
    USER: 'user',
  }

  const Subscription = {
    STARTER:"starter",
    PRO: "pro",
    BUSSINESS: "business"
  }
  
  module.exports = { HTTP_STATUS_CODE, Role, Subscription }