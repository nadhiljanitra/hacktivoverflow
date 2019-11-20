const Question = require('../models/Question')
const Answer = require('../models/Answer')

class QuestionControllers {

  static async findAll(req,res,next){
    try {
      let questions = await Question.find({}).populate('author','username').sort({updatedAt: 'desc'})
      res.status(200).json(questions)
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req,res,next){
    try {
      let { questionId } = req.params
      let question = await Question.findOne({_id:questionId}).populate('author','username').populate({path: 'answers', populate: {path: 'author'}})
        res.status(200).json(question)
    } catch (error) {
      next(error)
    }
  }

  static async findByAuthor(req,res,next){ //belum tentu perlu karena di vuex ada all questions
    try {
      let authorId = req.loggedUser._id
      let question = await Question.findOne({author:authorId})
        res.status(200).json(question)
    } catch (error) {
      next(error)
    }
  }

  static async create(req,res,next){
    try {
      let { title, content, tags } = req.body
      let author = req.loggedUser._id
      const create = await Question.create({title,content,tags,author})
      res.status(201).json(create)
    } catch (error) {
      next(error)
    }
  }

  static async update(req,res,next){
    try {
      let { questionId } = req.params
      let fields = req.body
      let arr = ['title','content','tags']
      let obj = {}
      arr.forEach((el) => {
        for (let key in fields){
          if (key === el){
            obj[key] = fields[key]
          }
        }
      })
      let updated = await Question.updateOne({_id:questionId},obj)
      res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }

  static async remove(req,res,next){
    try {
      let { questionId } = req.params
      let deleted = await Question.deleteOne({_id:questionId})
      await Answer.deleteMany({questionId})
      res.status(200).json(deleted)
    } catch (error) {
      next(error)
    }
  }

  static async addUpvote(req,res,next){
    try {
      let { questionId : _id }= req.params
      let userId = req.loggedUser._id
      const updateUpVote = await Question.findOneAndUpdate({_id},{$push : {upvote: userId},$pull : {downvote: userId}},{new:true})
      // await Question.updateOne({_id},{$pull : {downvote: userId}})
      res.status(200).json(updateUpVote)
    } catch (error) {
      next(error)
    }
  }

  static async removeUpvote(req,res,next){
    try {
      let { questionId : _id }= req.params
      let userId = req.loggedUser._id
      console.log(',masu');
      const updateUpVote = await Question.findOneAndUpdate({_id},{$pull : {upvote: userId}},{new:true})
      res.status(200).json(updateUpVote)
    } catch (error) {
      next(error)
    }
  }

  static async addDownvote(req,res,next){
    try {
      let { questionId : _id }= req.params
      let userId = req.loggedUser._id
      const updateDownVote = await Question.findOneAndUpdate({_id},{$push : {downvote: userId},$pull : {upvote: userId}},{new: true})
      // await Question.updateOne({_id},{$pull : {upvote: userId}})
      res.status(200).json(updateDownVote)
    } catch (error) {
      next(error)
    }
  }

  static async removeDownvote(req,res,next){
    try {
      let { questionId : _id }= req.params
      let userId = req.loggedUser._id
      const updateUpVote = await Question.findOneAndUpdate({_id},{$pull : {downvote: userId}},{new: true})
      res.status(200).json(updateUpVote)
    } catch (error) {
      next(error)
    }
  }

}

module.exports = QuestionControllers
