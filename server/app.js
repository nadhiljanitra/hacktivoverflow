if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const CronJob = require('cron').CronJob;
const app = express()
const PORT = process.env.PORT || 3000
const axios = require('axios')

const server = require('http').Server(app)
const io = require('socket.io')(server)

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


io.on('connection', function (socket) {
  new CronJob('0 0 0 * * *', function() {
    let num = Math.floor(Math.random()*100)
    axios({
      method : 'get',
      url : `http://numbersapi.com/${num}` 
    })
      .then((string)=>{
        // console.log(string.data)
        socket.emit('getNews', string.data)
      })
      .catch((err)=>{
        console.log(err);
      })
    // console.log('You will see this message every second');
  }, null, true, 'Asia/Jakarta');
});





app.use(errorHandler)


server.listen(PORT,() => console.log(`Up and running on ${PORT}`))