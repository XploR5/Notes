const jwt = require('jsonwebtoken')
const SECRETKEY = 'SECURE_SECRETKEY'

const auth = async (req, res, next) => {
  try {
    let token = req.headers.authorization.split(' ')[1]
    if (token) {
      let decodedData = jwt.verify(token, SECRETKEY)
      req.userId = decodedData.id
      next()
    }
    else {
      res.status(401).json({ message: 'Unauthorized user' })
    }
  }
  catch (err) {
    console.log(err) 
    res.status(401).json({ message: 'Unauthorized user' })
  }
}

module.exports = auth