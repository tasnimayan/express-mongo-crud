const express = require('express')
const router = require('./src/routes/api');

const mongoose = require('mongoose')
const cors = require('cors')
const hpp = require('hpp')
const rateLimit = require('express-rate-limit')
const helmet = require('helmet')
const mongoSanitize = require('express-mongo-sanitize')
const multer = require('multer')
const path = require("path");
const bodyParser = require('body-parser')
require('dotenv').config();




const app = express();


// middlewares
app.use(bodyParser.json())
app.use(router)
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json())
// app.use(cors())
// app.use(helmet())
// app.use(mongoSanitize())
// app.use(hpp())

const limiter = rateLimit({windowMs:15*60*1000, max:3000})
app.use(limiter)

const dbURI = process.env.DATABASE;

mongoose.connect(dbURI, {autoIndex:true})
  .then(()=>{
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  })


// Defining the middlwares
app.use("/api" ,router);

// Response for undefined routing
app.use('*', (req, res)=>{
  res.status(404)
  res.end(JSON.stringify({title:"Not found", message:"The page you are searching could not be found!"}))
})


module.exports = app;
