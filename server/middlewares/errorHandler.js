function errorHandling(err,req,res,next){

  let status = err.status || 500
  let message = err.message || 'Internal server error'

  if (err.name === 'ValidationError'){
    let arr = []
    for (let key in err.errors){
      arr.push(err.errors[key].message
        )
    }
    res.status(400).json({message: 'Validation error', arr})
  } else {
    res.status(status).json({message})
  }

}

module.exports = errorHandling