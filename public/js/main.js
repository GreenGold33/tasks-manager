(function() {

  $('.edit').on('click', function(e) {

    const idTask = $(this).closest('li').data('id')
    const url = `/task/${idTask}`

    $.ajax({ url })
      .then(fillEditFormData)
      .catch( () => alert("There was an error retrieving info from the task!") )

  })

  $('.remove').on('click', function(e) {

    const $parentContainer = $(this).closest('li')
    const idTask = $parentContainer.find('input[name="idTask"]').val()

    const url = `/task/${idTask}`
    const method = 'DELETE'

    $.ajax({ url,  method })
      .then( () => $parentContainer.remove() )
      .catch( () => alert("There was an error removing the task!") )

  })

  $('.newnotebtn').on('click', function(e) {

    const $form = $('.edit-add-task form')

    // Clean Form to default 'POST'
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
      let data = `title=${this.title.value}`
      data += `&description=${this.description.value}`

      const method = "PUT"

      $.ajax({ url, method, data })
        .done( () => {
          window.location = '/tasks'
        })

    }

  })

  const $containers = $('.tasks-panel ul')
  const containers = Array.from( $containers );
  const revertOnSpill = true;

  dragula({ containers, revertOnSpill })
    .on('drop', function(el, target, source, sibling) {

      let tasksData = [];
      if ( source !== target ) {
         tasksData = tasksData.concat( getTasksStatus(target) )
      }
      tasksData = tasksData.concat( getTasksStatus(source) )

      $.ajax({
          url: '/tasks',
          method: "PUT",
          dataType: "json",
          contentType: 'application/json',
          data: JSON.stringify(tasksData)
        })
        .done( ( response  ) => {
          adjustRows()
        })

    });

  function adjustRows() {
    $containers.each( (i,container) => {
      if( $(container).find("li").length === 0 ) {
        $(container).append('<li class="list-group-item dummy"></li>')
      }
      if( $(container).find("li").length >= 2 ) {
        $(container).find(".dummy").remove()
      }
    })
  }

  function getTasksStatus( container ) {
    const status = $(container).data('status')
    return Array.from( container.getElementsByTagName('li') ).reduce( (acc, item) => {
      const id = $(item).data('id')
      const order = $(container).children().index(item)
      acc.push({ id, order, status })
      return acc;
    }, [])
  }


  function fillEditFormData( task ) {
    const $form = $('.edit-add-task form')
    $('h4.modal-title').text('Edit Note')
    $form.addClass("edit")
        .attr('action',`/task/${task._id}`)
        .find('input[name="title"]').val(task.title)
          .end()
        .find('textarea[name="description"]').val(task.title)
  }

})()
