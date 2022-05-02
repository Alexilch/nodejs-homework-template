const { verify } = require('crypto')
const express = require('express')
const { signup, login, logout, verifyUser, reverifyUser } = require('../../../controllers/auth')
const { wrapper: wrapperError } = require('../../../middlewares/error-handler')
const router = express.Router()
const guard = require('../../../middlewares/guard')

router.post('/signup', wrapperError(signup))
router.post('/login', wrapperError(login))

router.get('/users/verify/:verificationToken', wrapperError(verifyUser))
router.post('/users/verify-email',  wrapperError(reverifyUser))

router.post('/logout', guard, wrapperError(logout))


module.exports = router