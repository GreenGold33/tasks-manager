const LocalStrategy = require('passport-local').Strategy
const Account = require(__base + 'models/Account')

const usernameField = 'email'

const options = { usernameField }

const handlerAuth = (email, password, done) => {
  const message = 'Incorrect username or password.'

  Account.findOne({ email: email })
    .then(user => {
      if (!user) {
        console.log('no user found!')
        return done(null, false, { message })
      }
      user.authenticate(password, (err, user, passwordErr) => {
        if (err) return done(err)
        if (passwordErr) {
          console.log('bad password!')
          return done(null, false, { message })
        }
        return done(null, user)
      })
    })
    .catch(err => done(err))
}

module.exports = new LocalStrategy(options, handlerAuth)
