const passport = require('passport')

// const twitterStrategy = require('./strategies/twitter')
const googleStrategy = require('./strategies/google')

const Account = require(__base + 'models/Account')

passport.use(Account.createStrategy())
passport.use(googleStrategy)

passport.serializeUser(function (user, done) {
  if (user.hash) Account.serializeUser()(user, done)
  else done(null, user)
})

passport.deserializeUser(function (user, done) {
  if (typeof user === 'string') Account.deserializeUser()(user, done)
  else done(null, user)
})

module.exports = passport
