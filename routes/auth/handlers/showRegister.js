module.exports = (req, res) => {
  const { path } = req
  res.render('auth/register', { path });
}