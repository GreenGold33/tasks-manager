(function() {

  $('.edit').on('click', function(e) {

    const $parentContainer = $(this).closest('li')
    const titleTask = $parentContainer.find('.title').text()
    const decriptionTask = $parentContainer.find('.description').text()
    const idTask = $parentContainer.find('input[type="hidden"]').val()

    const $form = $('.edit-add-task form')

    $('h4.modal-title').text('Edit Note')
    $form.addClass("edit")
      .attr('action',`/task/${idTask}`)
      .find('input[name="title"]').val(titleTask)
        .end()
    .find('textarea[name="description"]').val(decriptionTask)

  })

  $('.remove').on('click', function(e) {

    const $parentContainer = $(this).closest('li')
    const idTask = $parentContainer.find('input[name="idTask"]').val()
    $.ajax({
      url: `/task/${idTask}`,
      method: 'DELETE'
    })
    .done( () => window.location.reload() )

  })

  $('.newnotebtn').on('click', function(e) {

    const $form = $('.edit-add-task form')

    $('h4.modal-title').text('New Note')
    $form.removeClass()
      .attr('action','/tasks')
      .find('input[name="title"]').val('')
        .end()
    .find('textarea[name="description"]').val('')

  })

  $('.edit-add-task form').on('submit', function(e) {

    if ( $(this).hasClass('edit') ) {
      e.preventDefault()
      const url = this.action
      const method = "PUT"
      let data = `title=${this.title.value}`
      data += `&description=${this.description.value}`
      data += `&status=${this.status.value}`

      $.ajax({ url, method, data })
        .done( () => {
          debugger;
          window.location = '/tasks'

        })
    }

  })

})()
