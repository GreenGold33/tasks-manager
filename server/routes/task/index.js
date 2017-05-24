const express = require('express')
const router = express.Router()

const getById = require('./handlers/getById')
const removeById = require('./handlers/removeById')
const updateById = require('./handlers/updateById')

router.get('/:id', getById)
router.delete('/:id', removeById)
router.put('/:id', updateById)

module.exports = router
