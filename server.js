//// DEPENDENCIES ////
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
// const bodyParser = require('body-parser')
// const passport = require('passport')
const session = require('express-session')
require('dotenv').config();


//// DEPENDENCIES CONFIGURATIONS ////
const app = express();
const PORT = process.env.PORT || 3003;
const mongodbURI = process.env.MONGODBURI

// cors configurations
const whitelist = ['http://localhost:3000', 'http://localhost:3003', 'https://resumebuilderapi.herokuapp.com/', 'https://resumebuilder-frontend.herokuapp.com/']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

//// MIDDLEWARE ////
app.use(cors())
app.use(express.urlencoded({ extended: true })) 
app.use(express.json());
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

//// DATABASE ////
// config
// const db = require("./config/keys").mongoURI;
// errors
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'));
mongoose.connection.on('disconnected', () => console.log ('mongo is disconnected'));
//conections
mongoose.connect(mongodbURI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongoose');
});

// app.get('/', (req,res) => {
//     res.send('hello')
// })

//// CONTROLLERS ////
const resumesController = require('./controllers/resume')
app.use('/resumes', resumesController)

const usersController = require('./controllers/users')
app.use('/users', usersController )

const sessionsController = require('./controllers/sessions')
app.use('/sessions', sessionsController )

//// LISTENER ////
app.listen(PORT, ()=> {
    console.log('running on port', PORT);
  });