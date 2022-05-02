const { HTTP_STATUS_CODE } = require('../libs/constants')

const subscription = (subscription) => async (req, res, next) => {
  const currentUserSubscription = req.user.subscription

  if (currentUserSubscription !== subscription) {
    return res.status(HTTP_STATUS_CODE.FORBIDDEN).json({
      status: 'error',
      code: HTTP_STATUS_CODE.FORBIDDEN,
      message: 'Access denied',
    })
  }
  next()
}

module.exports = subscription