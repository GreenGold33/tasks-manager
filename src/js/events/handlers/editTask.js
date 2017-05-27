function editTask (e) {
  const idTask = $(this).closest('li').data('id')
  const url = `/task/${idTask}`

  $.ajax({ url })
    .then(fillEditFormData)
    .catch(() => alert('There was an error retrieving info from the task!'))
}

function fillEditFormData (task) {
  const $form = $('.edit-add-task form')
  $('h4.modal-title').text('Edit Note')
  $form.addClass('edit')
      .attr('action', `/task/${task._id}`)
      .find('input[name="title"]').val(task.title)
        .end()
      .find('textarea[name="description"]').val(task.title)
}

module.exports = editTask
