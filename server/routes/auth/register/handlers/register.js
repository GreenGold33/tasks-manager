const Account = require(__base + 'models/Account')

function register (req, res, next) {
  const { email, password } = req.body
  const account = new Account({ email })

  Account.register(account, password, err => {
    if (err) {
      console.log('error while user register!', err)
      return next(err)
    }

    console.log('user registered!')
    res.redirect('/')
  })
}

module.exports = register
