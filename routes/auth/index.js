const express = require('express')
const router = express.Router();

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const TwitterStrategy = require('passport-twitter').Strategy;
const TwitterConfig = require('./strategies/twitter').twitterStrategyConfig
const TwitterHandler = require('./strategies/twitter').twitterHandleAuth

const session = require('express-session')
const cookieParser = require('cookie-parser')

// const showHome = require('./handlers/showHome')
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
passport.use( new TwitterStrategy( TwitterConfig, TwitterHandler ) )

// passport.serializeUser( Account.serializeUser() )
// passport.deserializeUser( Account.deserializeUser() )

passport.serializeUser(function(user, done) {
  debugger;
  if (user.$isMongooseModelPrototype) {
    Account.serializeUser()(user, done)
  }

  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  debugger;
  if (user.$isMongooseModelPrototype) {
    Account.deserializeUser()(user, done)
  }

  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
  done(null, user);
});

router.get('/auth/twitter', passport.authenticate('twitter') );
router.get('/auth/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/login' }),
  afterLogin
);

router.get('/', (req, res) => res.redirect('/tasks') )
router.get('/register', showRegister);
router.post('/register', register);
router.get('/login', showLogin);
router.post('/login',passport.authenticate('local'), afterLogin);
router.get('/logout', doLogout);

module.exports = router;