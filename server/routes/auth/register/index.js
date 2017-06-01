const express = require('express')
const router = express.Router()

const passport = require(__base + '/config/passport')

const showRegister = require('./handlers/showRegister')
const register = require('./handlers/register')
const showEmailVerification = require('./handlers/showEmailVerification')
const verifyEmail = require('./handlers/verifyEmail')

router.get('/register', showRegister)
router.post('/register', register)
router.get('/email-verification', showEmailVerification)
router.get('/verify', verifyEmail)

module.exports = router

