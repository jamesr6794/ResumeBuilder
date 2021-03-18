//// DEPENDENCIES ////
const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

//// MODEL ////
const User = require('../models/user.js')

//// ROUTES ////

// create
router.post('/', (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (error, createdUser) => {
        if (error && error.code == "11000") {
            res.send({
                flash: 'This username in already take, please try a diffrent one'
            });
        } else if (error) {
            res.send({
                flash: 'that\'s embarrassing... something went wrong on our end. Plase try again'
            });
        } else {
            res.send({
                 flash: 'Welcome!',
                    // token: createdUser._id,
                    // firsName: createdUser.firsName,
                    // lastName: createdUser.lastName,
                    user: createdUser
            });
        }
    });
});

//read
router.get('/:id', (req, res) => {

    User.findById(req.params.id, (error, foundUser) => {
        if (error) {
            res.status(400).json({ error: error.message })
        }
        console.log(foundUser)
        res.status(200).json(foundUser)
    });
})

//update
router.put('/:id', (req, res) => {
    
    User.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, updatedUser) => {
        console.log(req.body)
        if (error) {
        console.log(error)
        res.status(400).json({ error: error.message })
        }
    console.log(updatedUser)
      res.status(200).json(updatedUser)
    });
});


module.exports = router;