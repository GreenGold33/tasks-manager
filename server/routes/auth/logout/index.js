const express = require('express')
const router = express.Router()

const doLogout = require('./handlers/doLogout')

router.get('/logout', doLogout)

module.exports = router
