module.exports = (req, res) => {
  const { path } = req
  res.render('register', { path });
}