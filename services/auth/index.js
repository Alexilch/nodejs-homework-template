const jwt = require('jsonwebtoken')
const Users = require('../../repository/users')
const { HTTP_STATUS_CODE } = require('../../libs/constants')
const { CustomError } = require('../../middlewares/error-handler')
const EmailService = require('../email/service')
const SenderNodemailer = require('../email/senders/nodemailersender')
// const SenderSendGrid = require('../email/senders/sendgridsender')

const SECRET_KEY = process.env.JWT_SECRET_KEY

class AuthService {
  async create(body) {
    const user = await Users.findByEmail(body.email)
    if (user) {
      throw new CustomError(HTTP_STATUS_CODE.CONFLICT, 'User already exists')
    }
    const newUser = await Users.create(body)

    const sender = new SenderNodemailer()
    const emailService = new EmailService(sender)
    try {
      await emailService.sendEmail(
        newUser.email,
        newUser.name,
        newUser.verificationToken,
      )
    } catch (error) {
      console.log(error)
    }

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    }
  }

  async login({ email, password }) {
    const user = await this.getUser(email, password)
    const token = this.generateToken(user)
    await Users.updateToken(user.id, token)
    return { token }
  }

  async logout(id) {
    await Users.updateToken(id, null)
  }

  async getUser(email, password) {
    const user = await Users.findByEmail(email)

    if (!user) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'User not found')
    }

    if (!(await user?.isValidPassword(password))) {
      throw new CustomError(
        HTTP_STATUS_CODE.UNAUTHORIZED,
        'Invalid credentials',
      )
    }

    if (!user?.verify) {
      throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, 'User not verified')
    }
    return user
  }


  generateToken(user) {
    const payload = { id: user.id, email: user.email, subscription: user.subscription }
    // console.log(SECRET_KEY);
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' })
    return token
  }

  async verifyUser(token) {
    const user = await Users.findByToken(token)
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.NOT_FOUND,
        'User not found'
      )
    }
     if (user && user.verify) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        'Verification has already been passed',
      )
    }
    await Users.verificationUser(user.id)
    return user
  }

  async reverifyUser(email) {
    const user = await Users.findByEmail(email)
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.NOT_FOUND,
        'User not found',
      )
    }

    if (user && user.verify) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        'Verification has already been passed',
      )
    }

    const sender = new SenderNodemailer()
    const emailService = new EmailService(sender)
    try {
      await emailService.sendEmail(user.email, user.name, user.verificationToken)
    } catch (error) {
      console.log(error)
      throw new CustomError(
        HTTP_STATUS_CODE.SERVICE_UNAVAILABLE,
        'Error sending email',
      )
    }
  }
}

module.exports = new AuthService()