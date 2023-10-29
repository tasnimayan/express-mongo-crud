const mongoose = require('mongoose')
const {Schema} = mongoose


const userSchema = new Schema({
  firstName:{type:String, },
  lastName:{type:String},
  email:{
    type:String,
    unique:true,
  },
  password:{type:String},
  phone:{type:Number},
  address:{type:String},
},
{timestamps: true, versionKey:false})

const User = mongoose.model('users', userSchema)

module.exports = User;