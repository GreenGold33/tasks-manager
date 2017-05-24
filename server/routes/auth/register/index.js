const express = require('express')
const router = express.Router();

const passport = require( __base + '/config/passport')

const showRegister = require('./handlers/showRegister')
const register = require('./handlers/register')

router.get('/register', showRegister);
router.post('/register', register);

module.exports = router;