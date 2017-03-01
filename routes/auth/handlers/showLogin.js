module.exports = (req, res) => {
  const { user, path } = req
  res.render('login', { user, path });
}