module.exports = (req, res) => {
  const { user } = req
  res.render('index', { user });
}