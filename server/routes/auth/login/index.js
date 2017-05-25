const express = require('express')
const router = express.Router()

const passport = require(__base + '/config/passport')

const showLogin = require('./handlers/showLogin')

const successRedirect = '/tasks'
const failureRedirect = '/login'

router.get('/login', showLogin)
router.post('/login', passport.authenticate('local', { successRedirect, failureRedirect }))

module.exports = router
