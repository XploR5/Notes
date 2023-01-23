const notesModel = require('../models/note')

const createNote = (req, res) => {
  console.log(req.userId)
  res.send('Create Note - NOTE Created')
}

const updateNote = (req, res) => {

}

const removeNote = (req, res) => {

}

const getAllNotes = (req, res) => {
  res.send('All Notes')
}

module.exports = { createNote, updateNote, removeNote, getAllNotes}