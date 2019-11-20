const answer = require('express').Router()

const { 
  create,
  findAll,
  update,
  remove,
  findOne,
  addUpvote,
  removeUpvote,
  addDownvote,
  removeDownvote} = require('../controllers/AnswerController')

const auth = require('../middlewares/authentication').authentication
const authz = require('../middlewares/authentication').authorizations

answer.get('/:answerId',findOne)
answer.get('/',findAll)
answer.post('/:questionId',auth,create)
answer.patch('/addUpvote/:answerId',auth,addUpvote)
answer.patch('/removeUpvote/:answerId',auth,removeUpvote)
answer.patch('/addDownvote/:answerId',auth,addDownvote)
answer.patch('/removeDownvote/:answerId',auth,removeDownvote)
answer.patch('/:answerId',auth,update) // mungkin tambahain authz comment
answer.delete('/:answerId',auth,remove) // mungkin tambahain authz comment


module.exports = answer