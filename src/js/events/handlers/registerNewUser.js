function registerNewUser (e) {
  e.preventDefault()

  const url = this.action
  const method = this.method
  const type = 'json'

  const email = $(this).find('[name="email"]').val()
  const password = $(this).find('[name="password"]').val()
  const data = { email, password }

  const submitButton = $(this).find('[type="submit"]')[0]

  const laddaRegister = Ladda.create(submitButton)
  laddaRegister.start()

  $.ajax({ url, method, type, data })
    .then(msg => {
      return swal({
        title: 'New Account Created',
        text: msg,
        type: 'success',
        confirmButtonText: 'Go to Homepage',
        onClose: modal => window.location.href = '/'
      })
    })
    .always(() => laddaRegister.stop())
    .catch(err => {
      const errorMsg = err.responseJSON.message
      $('.error-register')
        .find('p')
          .html(errorMsg)
          .end()
        .removeClass('hidden')
    })
}

module.exports = registerNewUser
