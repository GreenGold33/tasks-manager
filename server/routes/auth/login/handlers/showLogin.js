function showLogin (req, res) {
  const { path } = req

  const message = req.flash('error')[0]

  res.render('auth/login', { path, message })
}

module.exports = showLogin
