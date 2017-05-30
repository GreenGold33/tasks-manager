const GoogleStrategy = require('passport-google-oauth2').Strategy
const Account = require(__base + 'models/Account')

const clientID = process.env.GOOGLE_CLIENT_ID
const clientSecret = process.env.GOOGLE_CLIENT_SECRET
const callbackURL = process.env.GOOGLE_CALLBACK_URL
const passReqToCallback = true

const options = { clientID, clientSecret, callbackURL, passReqToCallback }

const handlerAuth = (req, accessToken, refreshToken, profile, done) => {
  const { id: oauthID, displayName: name, email } = profile

  Account.findOne({ oauthID })
    .then(user => {
      if (user !== null) done(null, user)
      else {
        user = new Account({ email, oauthID, name, created: Date.now() })
        return user.save()
          .then(() => done(null, user))
          .catch(err => {
            if (err.code === 11000) {
              const message = `The mail <strong>${email}</strong> is already registered in our system. <br/> <a href="/forgot-password">Have you forgotten your password?</a>`
              console.log(message)
              return done(null, false, req.flash('google-auth', message))
            }
            console.log('another google error creating account...')
            return done(err)
          })
      }
    })
    .catch(done)
}

module.exports = new GoogleStrategy(options, handlerAuth)

