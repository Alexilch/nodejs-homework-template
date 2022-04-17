const { HTTP_STATUS_CODE } = require('../../libs/constants')
const AvatarService = require('../../services/avatar')
const Storage = require('../../services/avatar/storage')


const avatar = async (req, res, next) => {
  const avatarService = new AvatarService(Storage, req.file, req.user)
  const urlOfAvatar = await avatarService.update()
  res.json({
    status: 'success',
    code: HTTP_STATUS_CODE.OK,
    payload: { avatarURL: urlOfAvatar },
  })
}

module.exports = { avatar }