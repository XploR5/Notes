const notesModel = require('../models/note')

const createNote = async (req, res) => {
  const { title, body } = req.body
  const userID = req.userId

  const newNote = new notesModel({ title, body, userID })

  try {
    await newNote.save()
    res.status(201).json(newNote)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong 😿' })
  }
}

const getAllNotes = async (req, res) => {
  try {
    const notes = await notesModel.find({ userID: req.userId })
    res.status(200).json(notes)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong 😿' })
  }
}

const updateNote = (req, res) => {}

const removeNote = (req, res) => {}

module.exports = { createNote, updateNote, removeNote, getAllNotes }
