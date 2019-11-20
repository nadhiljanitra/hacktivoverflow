const Answer = require('../models/Answer')
const Question = require('../models/Question')

class AnswerControllers {

  static async findAll(req,res,next){
    try {
      let answers = await Answer.find({}).populate('questionId','title')
      res.status(200).json(answers)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req,res,next){
    try {
      let { answerId } = req.params
      let answer = await Answer.findOne({_id:answerId}).populate('author','name')
        res.status(200).json(answer)
    } catch (error) {
      next(error)
    }
  }

  static async create(req,res,next){
    try {
      let { content } = req.body
      let author = req.loggedUser._id
      let { questionId }= req.params
      const create = await Answer.create({content,author,questionId})
      const updateQuestion = await Question.updateOne({_id:questionId},{$push:{answers:create._id}})
      res.status(201).json({create,updateQuestion})
    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      let { answerId } = req.params
      let fields = req.body
      let arr = ['content']
      let obj = {}
      arr.forEach((el) => {
        for (let key in fields){
          if (key === el){
            obj[key] = fields[key]
          }
        }
      })
      let updated = await Answer.updateOne({_id:answerId},obj)
      res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }

  static async remove(req,res,next){
    try {
      let { answerId: _id } = req.params
      let getAnswer = await Answer.findOne({_id})
      console.log(getAnswer)
      const question = await Question.updateOne({_id:getAnswer.questionId},{$pull:{answers:_id}})
      console.log(question)
      let deleted = await Answer.deleteOne({_id})
      res.status(200).json(deleted)
    } catch (error) {
      next(error)
    }
  }

  static async addUpvote(req,res,next){
    try {
      let { answerId : _id }= req.params
      let userId = req.loggedUser._id
      const updateUpVote = await Answer.updateOne({_id},{$push : {upvote: userId},$pull : {downvote: userId}})
      // await Question.updateOne({_id},{$pull : {downvote: userId}})
      res.status(200).json(updateUpVote)
    } catch (error) {
      next(error)
    }
  }

  static async removeUpvote(req,res,next){
    try {
      let { answerId : _id }= req.params
      let userId = req.loggedUser._id
      console.log(',masu');
      const updateUpVote = await Answer.updateOne({_id},{$pull : {upvote: userId}})
      res.status(200).json(updateUpVote)
    } catch (error) {
      next(error)
    }
  }

  static async addDownvote(req,res,next){
    try {
      let { answerId : _id }= req.params
      let userId = req.loggedUser._id
      const updateDownVote = await Answer.updateOne({_id},{$push : {downvote: userId},$pull : {upvote: userId}})
      // await Question.updateOne({_id},{$pull : {upvote: userId}})
      res.status(200).json(updateDownVote)
    } catch (error) {
      next(error)
    }
  }

  static async removeDownvote(req,res,next){
    try {
      let { answerId : _id }= req.params
      let userId = req.loggedUser._id
      const updateUpVote = await Answer.updateOne({_id},{$pull : {downvote: userId}})
      res.status(200).json(updateUpVote)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = AnswerControllers
