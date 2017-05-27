function addTask (e) {
  if ($(this).hasClass('edit')) {
    e.preventDefault()
    const url = this.action
    let data = `title=${this.title.value}`
    data += `&description=${this.description.value}`

    const method = 'PUT'

    $.ajax({ url, method, data })
      .done(() => {
        window.location = '/tasks'
      })
  }
}

module.exports = addTask
