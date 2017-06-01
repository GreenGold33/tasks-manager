function showLogin (req, res) {
  const { path } = req

  const messageLocalAuth = req.flash('error')[0]
  const messageGoogleAuth = req.flash('google-auth')[0]

  res.render('auth/login', { path, messageLocalAuth, messageGoogleAuth })
}

module.exports = showLogin
