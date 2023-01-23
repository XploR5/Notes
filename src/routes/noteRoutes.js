const express = require('express')
const { createNote, updateNote, removeNote, getAllNotes } = require('../controllers/notesController')
const auth = require('../middlewares/auth')

const noteRouter = express.Router()

noteRouter.post('/', auth, createNote )

noteRouter.get('/',auth, getAllNotes)

noteRouter.put('/:id',auth, updateNote)

noteRouter.delete('/:id',auth, removeNote)

module.exports = noteRouter;