const express = require('express')
const app = express()
const port = 5000

const userRouter = require('./routes/userRoutes')
const noteRouter = require('./routes/noteRoutes')

const mongoose = require('mongoose')
const dbURI =
'mongodb+srv://test:secure@cluster0.qwzp9jd.mongodb.net/?retryWrites=true&w=majority'

mongoose
.connect(dbURI)
.then((result) => {
  console.log('Connected to DB')
  // console.log(result)
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
})
.catch((err) => console.log(err))

app.use(express.json())
app.use('/users', userRouter)
app.use('/notes', noteRouter)

app.get('/', (req, res) => {
  res.send('Welcome to Notes App')
})
