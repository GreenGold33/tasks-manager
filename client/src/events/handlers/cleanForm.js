function cleanForm (e) {
  const $form = $('.edit-add-task form')

  // Clean Form to default 'POST'
  $('h4.modal-title').text('New Note')
  $form.removeClass()
    .attr('action', '/tasks')
    .find('input[name="title"]').val('')
      .end()
    .find('textarea[name="description"]').val('')
}

module.exports = cleanForm
