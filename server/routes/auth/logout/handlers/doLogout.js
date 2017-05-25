const debug = require('debug')('logout')

function logout(req, res) {
  debug('logout')
  req.logout();
  res.redirect('/');
}

module.exports = logout