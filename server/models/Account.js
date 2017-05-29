const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

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

Account.plugin(passportLocalMongoose, options)

module.exports = mongoose.model('Account', Account)
