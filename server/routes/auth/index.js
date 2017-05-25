const express = require('express')
const router = express.Router();

const register = require('./register')
const login = require('./login')
const logout = require('./logout')

const twitter = require('./twitter')

router.use( register )
router.use( login )
router.use( logout )

router.use( '/auth', twitter )

module.exports = router;