const mongoose = require('mongoose')
const Schema = mongoose.Schema

const answers = new Schema({
  questionId : {type: Schema.Types.ObjectId, ref:'Question'},
  author : {type: Schema.Types.ObjectId, ref:'User'},
  content: {
    type: String,
    required: [true,'Answers content is required']
  },
  upvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  downvote: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
},{
  timestamps: true
})

const Answer = mongoose.model('Answer',answers)

module.exports = Answer