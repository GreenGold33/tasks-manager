function showEmailVerification (req, res) {
  const title = 'Email verification sent!'
  res.render('auth/email-verification', { title })
}

module.exports = showEmailVerification
