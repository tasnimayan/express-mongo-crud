/*
* Title: User profile managing controller
* Description: This controller manages new user registration, User data read, data update and data deletion functionalities in our TODO application
* Author: Tasnim Ayan
* Date: 0/0/2023
*/

const User = require("../models/userModel")
const jwt = require('jsonwebtoken')
require('dotenv').config()


// User registration controller functionalities
exports.userRegister = async (req, res)=>{
  const payload = await req.body;

  await User.create(payload).then(()=>{
    res.status(200).json({status:"successful", data:payload})
  }).catch(err => {
    console.log(err);
    res.status(400).json({status:"failed"})
  })
}

// User login controller functionalities
exports.userLogin = async(req, res)=>{
  const data = req.body;
  const query = {$and:[{email:data.email}, {password:data.password}]};
  // const agg

  const result =  await User.findOne(query).count()
  // console.log(result, typeof result);
  if(result !== 1){
    res.status(400).json({status:"Did not found"})
  }
  else{
    const authKey = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '30 days' })
    console.log(authKey);
    res.send({status:"success", data:authKey})
  }
}


// View profile information
exports.userProfile = async(req, res)=>{
  const email = req.headers['email']
  await User.findOne({email:email},{firstName:1, lastName:1, email:1, phone:1}).then((data)=>{
      res.send(data)
  }).catch(err=>{
      res.send({status: "Failed"})
  })
}

// Update profile information
exports.updateProfile = async(req, res)=>{
  const email = req.headers['email']
  const updateData = req.body

  await User.updateOne({email:email}, updateData).then((data)=>{
      res.send(data)
  }).catch(err=>{
      res.send({status: "Failed"})
  })
}

