const express = require('express')
const { createNote, updateNote, removeNote, getAllNotes, getNoteById } = require('../controllers/notesController')
const auth = require('../middlewares/auth')

const noteRouter = express.Router()

noteRouter.post('/', auth, createNote )

noteRouter.get('/',auth, getAllNotes)

noteRouter.get('/:id', auth, getNoteById)

noteRouter.put('/:id',auth, updateNote)

noteRouter.delete('/:id',auth, removeNote)

module.exports = noteRouter;