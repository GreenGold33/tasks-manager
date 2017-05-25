const express = require('express')
const router = express.Router()

const passport = require(__base + '/config/passport')

const successRedirect = '/tasks'
const failureRedirect = '/login'

router.get('/twitter', passport.authenticate('twitter'))
router.get('/twitter/callback',
  passport.authenticate('twitter', { successRedirect, failureRedirect })
)

module.exports = router
