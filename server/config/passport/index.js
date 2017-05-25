const passport = require('passport')

const LocalStrategy = require('passport-local').Strategy
const twitterStrategy = require('./strategies/twitter')

const Account = require(__base + 'models/Account')

passport.use(new LocalStrategy(Account.authenticate()))
passport.use(twitterStrategy)

passport.serializeUser(function (user, done) {
  if (user.hash) Account.serializeUser()(user, done)
  else done(null, user)
})

passport.deserializeUser(function (user, done) {
  if (typeof user === 'string') Account.deserializeUser()(user, done)
  else done(null, user)
})

module.exports = passport
