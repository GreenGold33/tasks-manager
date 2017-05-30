const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongooseEmail = require('passport-local-mongoose-email')

const usernameField = 'email'
const options = { usernameField }

const Account = new Schema({
  oauthID: Number,
  name: String,
  createdAt: {
    type: Number,
    default: +new Date()
  }
})

Account.plugin(passportLocalMongooseEmail, options)

module.exports = mongoose.model('Account', Account)
