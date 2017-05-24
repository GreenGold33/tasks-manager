const express = require('express')

const router = express.Router();

const passport = require( __base + '/config/passport')

const showLogin = require('./handlers/showLogin')
const afterLogin = require('./handlers/afterLogin')

const logReq = require('../../_middleware/logReq')

router.get('/login', logReq.bind({}, 'preShowLogin'), showLogin);
router.post('/login', logReq.bind({}, 'preLogin'), passport.authenticate('local'), logReq.bind({}, 'Logged - preAfterLogin'), afterLogin);

module.exports = router;