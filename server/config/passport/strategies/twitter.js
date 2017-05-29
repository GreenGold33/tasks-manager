const TwitterStrategy = require('passport-twitter').Strategy
const Account = require(__base + 'models/Account')

const consumerKey = process.env.TWITTER_API_KEY
const consumerSecret = process.env.TWITTER_API_SECRET
const callbackURL = process.env.TWITTER_CALLBACK_URL

const options = { consumerKey, consumerSecret, callbackURL }

const handlerAuth = (accessToken, refreshToken, profile, done) => {
  const { id: oauthID, name, username } = profile

  Account.findOne({ oauthID })
    .then(user => {
      if (user !== null) done(null, user)
      else {
        user = new Account({ username, oauthID, name, created: Date.now() })
        return user.save()
          .then(() => {
            done(null, user)
          })
      }
    })
    .catch(done)
}

module.exports = new TwitterStrategy(options, handlerAuth)

