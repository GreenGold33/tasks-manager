const editTask = require('./handlers/editTask')
const removeTask = require('./handlers/removeTask')
const cleanForm = require('./handlers/cleanForm')
const addTask = require('./handlers/addTask')

$('.edit').on('click', editTask)
$('.remove').on('click', removeTask)
$('.newnotebtn').on('click', cleanForm)
$('.edit-add-task form').on('submit', addTask)
