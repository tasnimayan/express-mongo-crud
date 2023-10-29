const jwt = require('jsonwebtoken')
require('dotenv').config();


module.exports = (req, res, next)=>{
  const token = req.headers['token']

  jwt.verify(token, process.env.JWT_SECRET, (err, data)=>{
    if(err){
      res.status(401).send({status:"unauthorized"})
    }
    else{
      req.headers['email'] = data.email;
      next()
    }
  })

}


