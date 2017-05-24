const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;

const Account = require(__base + 'models/Account')

passport.use( new LocalStrategy( Account.authenticate() ) );

passport.serializeUser( Account.serializeUser() )
passport.deserializeUser( Account.deserializeUser() )

module.exports = passport;