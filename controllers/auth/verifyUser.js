const authService = require('../../services/auth')
const { HTTP_STATUS_CODE } = require('../../libs/constants')

const verifyUser = async (req, res) => {
    const token = req.param.token
    const user = await authService.verifyUser(token)
  return res.status(HTTP_STATUS_CODE.CREATED).json({
    status: 'success',
    code: HTTP_STATUS_CODE.CREATED,
    data: { message: 'Verification successful' },
  })
}


module.exports = verifyUser