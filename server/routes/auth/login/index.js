const express = require('express')

const router = express.Router();

const passport = require( __base + '/config/passport')

const showLogin = require('./handlers/showLogin')
const afterLogin = require('./handlers/afterLogin')

const logReq = require('../../_middleware/logReq')

router.get('/login', showLogin);
router.post('/login', passport.authenticate('local'), afterLogin);

module.exports = router;