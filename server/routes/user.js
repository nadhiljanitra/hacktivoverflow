const user = require('express').Router()
const { register,login,google,github,findAll,findOne,remove } = require('../controllers/UserController')
const auth = require('../middlewares/authentication').authentication

user.get('/',findAll)
user.get('/myprofile',auth,findOne)
user.delete('/:userId',remove)
user.post('/register',register)
user.post('/login',login)
user.post('/login/google',google)
user.get('/login/github',github)

module.exports = user