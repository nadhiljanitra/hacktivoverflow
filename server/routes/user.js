const user = require('express').Router()
const { register,login,google,github,findAll,findOne,remove,updateWatchedTags, removeWatchedTag, } = require('../controllers/UserController')
const auth = require('../middlewares/authentication').authentication

user.get('/',findAll)
user.get('/myprofile',auth,findOne)
user.delete('/:userId',remove)
user.post('/register',register)
user.post('/login',login)
user.post('/login/google',google)
user.get('/login/github',github)
user.patch('/watchedTag',auth,updateWatchedTags)
user.patch('/remove-watched-tag',auth,removeWatchedTag)

module.exports = user