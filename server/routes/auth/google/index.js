const express = require('express')
const router = express.Router()

const passport = require(__base + '/config/passport')

const successRedirect = '/tasks'
const failureRedirect = '/login'

const scope = [ 'email', 'profile' ]

router.get('/google', passport.authenticate('google', { scope }))
router.get('/google/callback',
  passport.authenticate('google', { successRedirect, failureRedirect })
)

module.exports = router
