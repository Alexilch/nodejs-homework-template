const authService = require('../../services/auth')
const { HTTP_STATUS_CODE } = require('../../libs/constants')

const reverifyUser = async (req, res) => {
    const { email } = req.body
    await authService.reverifyUser(email)
  return res.status(HTTP_STATUS_CODE.CREATED).json({
    status: 'success',
    code: HTTP_STATUS_CODE.CREATED,
    data: { message: 'Verification email sent' },
  })
}


module.exports = reverifyUser