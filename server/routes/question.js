const question = require('express').Router()

const { 
  create,
  findAll,
  update,
  remove,
  findOne,
  addUpvote,
  removeUpvote,
  searchByTag,
  addDownvote,
  
  removeDownvote,
  findByAuthor } = require('../controllers/QuestionController')

const auth = require('../middlewares/authentication').authentication
const authz = require('../middlewares/authentication').authorizations

question.get('/:questionId',findOne)
question.get('/',findAll)
question.get('/byAuthor/:author',auth, findByAuthor)
question.post('/',auth,create)
question.post('/search-tag',searchByTag)
question.patch('/addUpvote/:questionId',auth,addUpvote)
question.patch('/removeUpvote/:questionId',auth,removeUpvote)
question.patch('/addDownvote/:questionId',auth,addDownvote)
question.patch('/removeDownvote/:questionId',auth,removeDownvote)

question.patch('/:questionId',auth,authz,update)
question.delete('/:questionId',auth,authz,remove)


module.exports = question