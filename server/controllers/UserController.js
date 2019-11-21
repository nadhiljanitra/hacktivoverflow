const User = require('../models/User')
const { getToken } = require('../helpers/jwt')
const { compareHash } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library');
const axios = require('axios')
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {

  static async findAll(req,res,next){
    try {
      let users = await User.find({})
      res.status(200).json({users})
    } catch (error) {
      next(error)
    }
  }

  static async findOne(req,res,next){
    try {
      let {_id} = req.loggedUser
      let user = await User.findOne({_id})
      res.status(200).json({user})
    } catch (error) {
      next(error)
    }
  }

  static async remove(req,res,next){
    try {
      let id = req.params.userId
      let deleted = await User.deleteOne({_id:id})
      res.status(200).json(deleted)
    } catch (error) {
      next(error)
    }
  }

    static async register(req,res,next){
      try {
        let {email,password,username} = req.body
        const create = await User.create({email,password,username})
        let payload = {
          _id : create._id,
          username : create._username,
        }
        let token = getToken(payload)
        let name = create.username
        res.status(201).json({token,username:name})
      } catch (error) {
        next(error)
      }
    }
  
    static async login(req,res,next){
      try {
        let {email,password} = req.body
        let foundUser = await User.findOne({email})
        if(foundUser){
          if(foundUser.loginWith === 'google'){
            next({status : 403, message : 'You have been sign in using google, please sign in using google'})
          } else if (foundUser.loginWith === 'github') {
            next({status : 403, message : 'You have been sign in using github, please sign in using github'})
          } else {
            if(compareHash(password,foundUser.password)){
              let payload = {
                _id : foundUser._id,
                username : foundUser.username
              }
              let token = getToken(payload)
              let username = foundUser.username
              res.status(200).json({token,username})
            } else {
              next({status: 403, message : 'Email / password invalid'})
            }
          }
        } else {
          console.log('masuk')
          next({status: 403, message : 'Email / password invalid'})
        }
      } catch (error) {
        console.log(error);
        next(error)  
      }
    }
  
    static google(req,res,next){
      let { id_token } = req.body
      let payloadJWT
      let username
      let useremail
      client.verifyIdToken({
        idToken : id_token,
        audience : process.env.CLIENT_ID
      })
      .then((tiket)=>{
        const payload = tiket.getPayload()
        const { email, name } = payload
        username = name
        useremail = email
        return User.findOne({email})
      })
      .then((emailFind)=>{
        if (emailFind) {
          if(emailFind.loginWith === 'web'){
            next({status : 403, message : 'You have been sign in using email, please sign in using email'})
          } else if (emailFind.loginWith === 'github') {
            next({status : 403, message : 'You have been sign in using github, please sign in using github'})
          } else if (emailFind.loginWith === 'google') {
            let { _id, username } = emailFind
            payloadJWT = { _id,username }
            let token = getToken(payloadJWT)
            res.status(200).json({token,username})
          }
        } else {
          let password = 'randompasswordforgoogle123'
          User.create({username,password,email : useremail, loginWith : 'google'}) 
          .then((created)=>{
            let pyld = {_id:created._id,username}
            let token = getToken(pyld)
            res.status(200).json({token,username})
          })
        }
      })
      .catch((error)=>{
        console.log(error)
        next(error)
      })
    }
  
    static async github(req,res,next){
      try {
        const { code } = req.query
        const { data:token } = await axios({
          method: 'post',
          url: `https://github.com/login/oauth/access_token?client_id=${process.env.CLIENT_ID_GITHUB}&client_secret=${process.env.CLIENT_SECRET_GITHUB}&code=${code}`,
          headers : {
            accept : 'application/json'
          }
        })
        const {data:user} = await axios({
          method: 'get',
          url: 'https://api.github.com/user',
          headers : {
            Authorization: `token ${token.access_token}`,
            scope: 'user:email'
          }
        })
        const {data:email} = await axios({
          method: 'get',
          url: 'https://api.github.com/user/emails',
          headers : {
            Authorization: `token ${token.access_token}`,
            accept : 'application/json'
          }
        })
        let emailGithub = email[0].email
        const emailFind = await User.findOne({email : email[0].email})
        if(emailFind){
          if (emailFind.loginWith === 'web'){
            res.redirect(
              `${process.env.REDIRECT_GITHUB}?msg='You have been sign in using email, please sign in using email'`
            )
          } else if (emailFind.loginWith === 'google') {
            res.redirect(
              `${process.env.REDIRECT_GITHUB}?msg='You have been sign in using google, please sign in using google'`
            )
          } else if (emailFind.loginWith === 'github'){
            let { _id } = emailFind._id
            let username = emailFind.username
            let payloadJWT = { _id, username }
            let token = getToken(payloadJWT)
            res.redirect(
              `${process.env.REDIRECT_GITHUB}?token=${token}`
            )
          }
        } else {
           let password = 'rahasiaGithub'
           let username = user.login
           const created = await User.create({ username,email:emailGithub,password, loginWith: 'github' })
           let payload = {
             _id : created._id,
             username : created.username
           }
           let token = getToken(payload)
           res.redirect(
             `${process.env.REDIRECT_GITHUB}?token=${token}`
           )
        }
  
      } catch (error) {
        next(error)
      }
    }

  static async updateWatchedTags(req,res,next){
    try {
      let { tags } = req.body
      let {_id} = req.loggedUser
      let updated = await User.findOneAndUpdate({_id},{wathedTag: tags},{new: true})
      res.status(200).json(updated)
    } catch (error) {
      next(error)
    }
  }

  static async removeWatchedTag(req,res,next){
    try {
    let { tag } = req.body
    let {_id} = req.loggedUser
    let updateUser = await User.findOneAndUpdate({_id},{$pull:{wathedTag: tag}},{new: true})
    res.status(200).json(updateUser)   
    } catch (error) {
      next(error)
    }
  }
}

module.exports = UserController