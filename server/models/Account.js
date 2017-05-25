const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const Account = new Schema({
  oauthID: Number,
  name: String,
  createdAt: {
    type: Number,
    default: +new Date()
  }
})

Account.plugin(passportLocalMongoose)

module.exports = mongoose.model('Account', Account)
