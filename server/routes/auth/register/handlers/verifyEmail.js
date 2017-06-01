const Account = require(__base + 'models/Account')

function verifyEmail (req, res) {
  const { authToken } = req.query
  Account.verifyEmail(authToken, (err, existingAuthToken) => {
    if (err) console.log('err:', err)
    const title = 'Email verified succesfully!'
    res.render('auth/email-verification', { title })
  })
}

module.exports = verifyEmail
