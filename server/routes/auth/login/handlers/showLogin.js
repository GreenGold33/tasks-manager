function showLogin (req, res) {
  const { path } = req
  res.render('auth/login', { path })
}

module.exports = showLogin
