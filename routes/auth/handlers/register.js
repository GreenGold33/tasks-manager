var Account = require('../../../models/Account');

module.exports = (req, res, next) => {
  const { username, password } = req.body
  const account = new Account({ username })
  Account.register( account, password, err => {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');
    res.redirect('/');
  });
}