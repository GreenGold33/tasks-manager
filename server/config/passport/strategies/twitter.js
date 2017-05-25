const TwitterStrategy = require('passport-twitter').Strategy
const Account = require(__base + 'models/Account')

require('dotenv').config()

const consumerKey = process.env.TWITTER_API_KEY
const consumerSecret = process.env.TWITTER_API_SECRET
const callbackURL = process.env.TWITTER_CALLBACK_URL

const options = { consumerKey, consumerSecret, callbackURL }

const handlerAuth = (accessToken, refreshToken, profile, done) => {
  const { id: oauthID, name, username } = profile

  Account.findOne({ oauthID })
    .then(user => {
      if (user !== null) {
        done(null, user)
      } else {
        user = new Account({ username, oauthID, name, created: Date.now() })
        return user.save()
          .then(() => {
            console.log('New User detected so => saved to DB...')
            done(null, user)
          })
      }
    })
    .catch(done)
}

// const strategyHandler = (accessToken, refreshToken, profile, done) => {
//   require('debug')('twitterStrategy:accessToken')(accessToken)
//   require('debug')('twitterStrategy:refreshToken')(refreshToken)
//   delete profile._raw
//   require('debug')('twitterStrategy:profile')(profile)
//   done(null, profile)
// }

module.exports = new TwitterStrategy(options, handlerAuth)

