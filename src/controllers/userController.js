const userModel = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const SECRETKEY = process.env.SECRETKEY

const signup = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existingUser = await userModel.findOne({ email: email })
    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'User with given email already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const result = await userModel.create({
      username: username,
      email: email,
      password: hashedPassword,
    })

    const token = jwt.sign({ email: result.email, id: result._id }, SECRETKEY)

    res.status(201).json({ user: result, token: token })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: 'Something went wrong 😿' })
  }
}

const login = async (req, res) => {
  const { username, email, password } = req.body
  try {
    const existingUser = await userModel.findOne({ email: email })
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: 'User not found, Please Signup' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid Credentials' })
    }

    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SECRETKEY)

    res.status(200).json({ user: existingUser, token: token })

  } catch (err) {
    console.log(err)
    res.status(404).json({ message: 'Something Went Wrong 😿' })
  }
}

module.exports = { signup, login }