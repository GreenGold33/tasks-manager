const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongooseEmail = require('passport-local-mongoose-email')

const usernameField = 'email'
const incorrectPasswordError = 'Username or Password Incorrect'
const incorrectUsernameError = 'Username or Password Incorrect'
const userExistsError = `The mail <strong>%s</strong> is already registered in our system. <br/> <a href="/forgot-password">Have you forgotten your password?</a>
  <br/> <a href="/auth/google">Did you sign in with Google?</a>`
const noSaltValueStoredError = `Your mail is registered in our system but you probably signed in with your Google Account. <br/> <a href="/auth/google">Sign In With Google</a>`

const options = { usernameField, incorrectPasswordError, incorrectUsernameError, userExistsError, noSaltValueStoredError }

const Account = new Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    required: true
  },
  isAuthenticated: Boolean,
  oauthID: Number,
  name: String,
  createdAt: {
    type: Number,
    default: +new Date()
  }
})

Account.plugin(passportLocalMongooseEmail, options)

module.exports = mongoose.model('Account', Account)
