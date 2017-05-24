const express = require('express')
const router = express.Router();

const register = require('./register')
const login = require('./login')
const logout = require('./logout')

router.use( register )
router.use( login )
router.use( logout )

module.exports = router;