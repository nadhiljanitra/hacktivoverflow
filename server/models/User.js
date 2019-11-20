const mongoose = require('mongoose')
const { getHash } = require('../helpers/bcrypt')
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema

const users = new Schema({

  username : {
    type: String,
    required: [true,'Username is required']
  },
  email : {
    type: String,
    required: [true,'Email is required'],
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Email format is invalid']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  loginWith: {
    type: String,
    default: 'web'
  },
  wathedTag: [String]



},{
  timestamps: true
  }
)

users.pre('save',function(next){
  this.password = getHash(this.password)
  next()
})

users.plugin(uniqueValidator, { message: '{PATH} already in use.' });

const User = mongoose.model('User',users)
module.exports = User