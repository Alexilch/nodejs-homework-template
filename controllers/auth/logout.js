const authService = require('../../services/auth')
const { HTTP_STATUS_CODE } = require('../../libs/constants')


const logout = async (req, res) => {
    await authService.logout(req.user.id)
    return res.status(HTTP_STATUS_CODE.NO_CONTENT).json()
  }

module.exports = logout