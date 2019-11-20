const { verifyToken } = require('../helpers/jwt')
const User = require('../models/User')
const Question = require('../models/Question')

async function authentication(req,res,next){
  try {
    let { token }= req.headers
    let decoded = verifyToken(token)
    let findUser = await User.findOne({_id:decoded._id})
    if (findUser._id){
      req.loggedUser = decoded
      next()
    } else {
      next({status: 403, message: 'You are not authorize to perform this action'})
    }
  } catch (error) {
    next({status: 403, message: 'You are not authorize to perform this action'})
  }
}

async function authorizations(req,res,next){
  try {
    let userId = req.loggedUser._id
    let { questionId }= req.params
    let findQuestion = await Question.findOne({ _id : questionId })
    if(findQuestion.author == userId){
      next()
    } else {
      next({status: 403, message: 'You are not authorize to perform this action'})
    }
  } catch (error) {
    next(error)
  }
}

module.exports = { authentication, authorizations}
