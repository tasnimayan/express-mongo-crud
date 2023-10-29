
const app = require('./app.js')
require('dotenv').config();
const mongoose = require('mongoose')


const PORT = process.env.PORT || 8000;

app.listen(5000, ()=>{
  console.log(`App is running on port ${PORT}`);
})