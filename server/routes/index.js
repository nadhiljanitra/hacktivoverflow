const router = require('express').Router()
const user = require('./user')
const answer = require('./answer')
const question = require('./question')

router.use('/users',user)
router.use('/questions',question)
router.use('/answers',answer)

module.exports = router