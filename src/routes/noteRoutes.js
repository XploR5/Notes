const express = require('express')
const { createNote, updateNote, removeNote, getAllNotes } = require('../controllers/notesController')
const auth = require('../middlewares/auth')

const noteRouter = express.Router()

noteRouter.post('/', auth, createNote )

noteRouter.get('/', getAllNotes)

noteRouter.put('/:id', updateNote)

noteRouter.delete('/:id', removeNote)

module.exports = noteRouter;