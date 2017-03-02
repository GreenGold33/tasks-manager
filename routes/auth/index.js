const express = require('express')
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const session = require('express-session')
const cookieParser = require('cookie-parser')

const showHome = require('./handlers/showHome')
const showRegister = require('./handlers/showRegister')
const showLogin = require('./handlers/showLogin')
const register = require('./handlers/register')
const afterLogin = require('./handlers/afterLogin')
const doLogout = require('./handlers/doLogout')

const Account = require('../../models/Account');

router.use( cookieParser() );
router.use( session({
  secret: 'supersecretworddonottelltoanyone',
  resave: true,
  saveUninitialized: true
}) );

// Configure passport middleware
router.use(passport.initialize());
router.use(passport.session());

passport.use( new LocalStrategy( Account.authenticate() ) );
passport.serializeUser( Account.serializeUser() )
passport.deserializeUser( Account.deserializeUser() )

router.get('/', showHome)
router.get('/register', showRegister);
router.post('/register', register);
router.get('/login', showLogin);
router.post('/login', passport.authenticate('local'), afterLogin);
router.get('/logout', doLogout);

module.exports = router;