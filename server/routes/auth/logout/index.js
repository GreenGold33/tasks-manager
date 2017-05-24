const express = require('express')
const router = express.Router();

const doLogout = require('./handlers/doLogout')

const logReq = require('../../_middleware/logReq')

router.get('/logout', logReq.bind({}, 'preLogOut'), doLogout);

module.exports = router;