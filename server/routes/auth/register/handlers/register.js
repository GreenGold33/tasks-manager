const Account = require(__base + 'models/Account')

function register (req, res, next) {
  const { email, password } = req.body
  const account = new Account({ email })

  Account.register(account, password, err => {
    if (err) return next(err)

    const authenticationURL = `/verify?authToken=${account.authToken}`
    console.log(authenticationURL)

    res.redirect('/')
  })
}

module.exports = register
