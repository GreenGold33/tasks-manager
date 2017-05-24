const express = require('express')
const router = express.Router()

const showHome = require('./handlers/showHome')

const logReq = require('../../_middleware/logReq')

router.get('/', logReq.bind({}, 'preShowHome'), showHome)

module.exports = router
