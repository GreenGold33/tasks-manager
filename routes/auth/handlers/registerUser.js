var Account = require('../../../models/Account');

const handle

module.exports = (req, res, next) => {
  const { username, password } = req.body
  Account.register(new Account({ username} ), password, err => {
    if (err) {
      console.log('error while user register!', err);
      return next(err);
    }

    console.log('user registered!');

    res.redirect('/');
  });
}