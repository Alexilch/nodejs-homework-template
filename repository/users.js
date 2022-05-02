const User = require('../models/user')

const findById = async (id) => {
    return await User.findById(id)
}

const findByEmail = async (email) => {
    return await User.findOne({ email })
}

const findByToken = async (verificationToken) => {
    return await User.findOne({ verificationToken })
}

const create = async (body) => {
    const user = await User(body)
    return await user.save()
}

const updateToken = async (id, token) => {
    return await User.findByIdAndUpdate(id, { token })
}
// updateOne
const updateAvatar = async (id, avatar, cloudId = null) => {
    return await User.findByIdAndUpdate(id, { avatar, cloudId }) 
  }

const verificationUser = async (id) => {
    return await User.findByIdAndUpdate(id, { verify: true,  })
}

module.exports = { findById, findByEmail, findByToken, create, updateToken, updateAvatar, verificationUser, }