const LocalStrategy = require('passport-local').Strategy
const Account = require(__base + 'models/Account')

const usernameField = 'email'
const passReqToCallback = true

const options = { usernameField, passReqToCallback }

const handlerAuth = (req, email, password, done) => {
  const message = 'Incorrect username or password.'

  Account.findOne({ email: email })
    .then(user => {
      if (!user) {
        return done(null, false, req.flash('local-auth', message))
      }
      user.authenticate(password, (err, user, passwordErr) => {
        if (err) return done(err)
        if (passwordErr) {
          return done(null, false, req.flash('local-auth', message))
        }
        return done(null, user)
      })
    })
    .catch(err => done(err))
}

module.exports = new LocalStrategy(options, handlerAuth)
