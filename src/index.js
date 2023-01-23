const express = require('express')
const app = express()
const port = process.env.PORT || 5000
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()


const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')

const mongoose = require('mongoose')
const dbURI = process.env.dbURI

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log('Connected to DB')
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
  })
  .catch((err) => console.log(err))

app.use(cors())
app.use(express.json())
app.use('/users', userRouter)
app.use('/notes', noteRouter)

app.get('/', (req, res) => {
  res.send('Welcome to Notes App')
})
