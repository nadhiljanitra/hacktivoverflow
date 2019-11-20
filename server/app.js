if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

mongoose.connect('mongodb://localhost:27017/stackOverflow', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log(`conencted on mongodb local`) )
  .catch((err) => console.log(`${err}`))


app.use(cors())
app.use(morgan('dev'))

app.use('/',router)
app.use(errorHandler)


app.listen(PORT,() => console.log(`Up and running on ${PORT}`))