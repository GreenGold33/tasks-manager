const Account = require(__base + 'models/Account')

const apiKey = process.env.MAILGUN_API_KEY
const domain = process.env.MAILGUN_DOMAIN

const mailgun = require('mailgun-js')({ apiKey, domain })

function register (req, res, next) {
  const { email, password } = req.body
  const account = new Account({ email })

  Account.register(account, password, err => {
    if (err) {
      res.status(500).send(err)
      return next()
    }
    console.log('por aqui...')
    const authenticationURL = `http://localhost:3001/verify?authToken=${account.authToken}`

    var data = {
      from: 'SkyTrelio <info@skytrelio.com>',
      to: email,
      subject: 'Verify Your Email Adress',
      html: `<a target=_blank href='${authenticationURL}'>Confirm your email</a>`
    }

    mailgun.messages().send(data, function (error, body) {
      // res.redirect('/email-verification')
      res.send('A Verification Link has been sent to your email')
    })
  })
}

module.exports = register
