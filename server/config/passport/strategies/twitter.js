require('dotenv').config()

module.exports.twitterStrategyConfig = {
  consumerKey: process.env.TWITTER_API_KEY,
  consumerSecret: process.env.TWITTER_API_SECRET,
  callbackURL: process.env.TWITTER_CALLBACK_URL
}

module.exports.twitterHandleAuth = (accessToken, refreshToken, profile, done) => {
 done(null, profile)
}