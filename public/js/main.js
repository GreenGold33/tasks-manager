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
      let data = `title=${this.title.value}`
      data += `&description=${this.description.value}`
      data += `&status=${this.status.value}`

      updateDataServer(data, url)

    }

  })

  const $containers = $('.tasks-panel ul')
  const containers = Array.from( $containers );
  const revertOnSpill = true;

  adjustRows()

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
        console.log(response);
        //window.location = '/tasks'
      })

      //console.log(tasksData);
      const newStatus = $(target).data('status')
      const idTask = $(el).data('id')
      const data = `status=${newStatus}`
      const url = `/task/${idTask}`
      // updateDataServer(data, url)
      // adjustRows($containers)
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


  function updateDataServer( data, url ) {
    const method = "PUT"
    $.ajax({ url, method, data })
      .done( () => {
        window.location = '/tasks'
      })
  }

  //alert("new loading....")

})()
