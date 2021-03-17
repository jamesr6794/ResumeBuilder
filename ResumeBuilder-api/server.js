//// DEPENDENCIES ////
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')

//// DEPENDENCIES CONFIGURATIONS ////
const app = express();
const PORT = process.env.PORT || 3003;
// cors configurations
const whitelist = ['http://localhost:3000', 'http://localhost:3001']
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
app.use(cors(corsOptions))
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
app.use(passport.initialize())

//// DATABASE ////
// config
const db = require("./config/keys").mongoURI;
// errors
mongoose.connection.on('error', err => console.log(err.message + ' is Mongod not running?'));
mongoose.connection.on('disconnected', () => console.log ('mongo is disconnected'));
//conections
mongoose.connect('mongodb://localhost:27017/resumes', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongoose');
});

// app.get('/', (req,res) => {
//     res.send('hello')
// })

//// CONTROLLERS ////
const resumesController = require('./controllers/resume.js')
app.use('/resumes', resumesController)

const usersController = require('./controllers/users_controller')
app.use('/users', usersController )

//// LISTENER ////
app.listen(PORT, ()=> {
    console.log('running on port', PORT);
  });