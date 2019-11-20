const mongoose = require('mongoose')
const Schema = mongoose.Schema

const questions = new Schema({
  title: {
    type: String,
    required: [true,'Questions title is required']
  },
  content: {
    type: String,
    required: [true,'Questions content is required']
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  tags: [String], // unique?
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  answers: [{
    type: Schema.Types.ObjectId,
    ref: 'Answer'
  }],
  views: { 
    type: Number,
    default: 0
  },
  slug:{
    type: String
  }

},{
  timestamps: true
})

questions.pre('save',function(next){
  this.slug = this.title.split(" ").join("-")
  next()
})



const Question = mongoose.model('Question',questions)

module.exports = Question