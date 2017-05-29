function showLogin (req, res) {
  const { path } = req
  const message = req.flash('error')
  res.render('auth/login', { path, message })
}

module.exports = showLogin
