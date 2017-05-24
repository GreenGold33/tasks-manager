const express = require('express')
const router = express.Router()

const showHome = require('./handlers/showHome')

router.get('/', showHome)

module.exports = router
