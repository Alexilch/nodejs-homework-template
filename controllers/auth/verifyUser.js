const authService = require('../../services/auth')
const { HTTP_STATUS_CODE } = require('../../libs/constants')

const verifyUser = async (req, res) => {
    const verificationToken = req.param.verificationToken
    const user = await authService.verifyUser(verificationToken)
  return res.status(HTTP_STATUS_CODE.OK).json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    data: { message: `Verification successful, welcome ${user.name}` },
  })
}


module.exports = verifyUser