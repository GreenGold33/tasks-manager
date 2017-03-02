module.exports = (req, res) => {
  const { user, path } = req
  res.render('auth/login', { user, path });
}