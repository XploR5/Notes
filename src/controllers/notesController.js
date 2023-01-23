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
    if (!notes) return res.status(404).json({ message: 'Notes not found' })

    res.status(200).json(notes)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong 😿' })
  }
}

const getNoteById = async (req, res) => {
  const id = req.params.id
  try {
    const note = await notesModel.findById(id)
    if(!note) return res.status(404).json({ message: 'Note not found' })
    res.status(200).json(note)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong 😿' })
  }
}

const updateNote = async (req, res) => {
  const id = req.params.id
  const { title, body } = req.body

  const newNote = {
    title: title,
    body: body,
    userID: req.userId,
  }

  try {
    const updatedNote = await notesModel.findByIdAndUpdate(id, newNote, {
      new: true,
    })
    if (!updatedNote) return res.status(404).json({ message: 'Note not found' })
    res.status(200).json(updatedNote)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong 😿' })
  }
}

const removeNote = async (req, res) => {
  const id = req.params.id

  try {
    const deletedNote = await notesModel.findByIdAndRemove(id)
    if (!deletedNote) return res.status(404).json({ message: 'Note not found' })
    res.status(202).json(deletedNote)
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong 😿' })
  }
}

module.exports = {
  createNote,
  updateNote,
  removeNote,
  getAllNotes,
  getNoteById,
}