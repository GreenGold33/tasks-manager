$('.edit').on('click', function(e) {
  const $parentContainer = $(this).closest('li')
  const titleTask = $parentContainer.find('.title').text()
  const decriptionTask = $parentContainer.find('.description').text()

  $('h4.modal-title').text('Edit Note')
  $('form.edit-add-task')
    .attr('action','/task/234234234234')
    .find('input[name="title"]').val(titleTask)
      .end()
  .find('textarea[name="description"]').val(decriptionTask)

})

$('.remove').on('click', function(e) {
  const $parentContainer = $(this).closest('li')
  const idTask = $parentContainer.find('input[type="hidden"]').val()
  $.ajax({
    url: `/task/${idTask}`,
    method: 'DELETE'
  })
  .done( () => window.location.reload() )

})

$('.newnotebtn').on('click', function(e) {
  $('h4.modal-title').text('New Note')
  $('form.edit-add-task')
    .attr('action','/tasks')
    .find('input[name="title"]').val('')
      .end()
  .find('textarea[name="description"]').val('')

})