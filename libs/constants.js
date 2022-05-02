const HTTP_STATUS_CODE = {
    OK: 200,
    CREATED: 201,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_SERVER_ERROR: 500,
    SERVICE_UNAVAILABLE: 503,
  }

  const Subscription = {
    STARTER:"starter",
    PRO: "pro",
    BUSSINESS: "business",
  }
  
  module.exports = { HTTP_STATUS_CODE, Subscription }