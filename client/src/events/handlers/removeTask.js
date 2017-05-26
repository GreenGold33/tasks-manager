function removeTask (e) {
  const $parentContainer = $(this).closest('li')
  const idTask = $parentContainer.find('input[name="idTask"]').val()

  const url = `/task/${idTask}`
  const method = 'DELETE'

  $.ajax({ url, method })
    .then(() => $parentContainer.remove())
    .catch(() => alert('There was an error removing the task!'))
}

module.exports = removeTask
