const express = require('express')
const bcrypt = require('bcrypt')
const sessions = express.Router()
const User = require('../models/users.js')

sessions.post('/', async (req, res) => {
    User.findOne({username: req.body.username}, (error, foundUser) => {
        if (error) {
            console.log(error)
            res.send('possible DataBase error')
        } else if (!foundUser) {
            res.send('No user found')
        } else {
            if (bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.currentUser = foundUser
            } else {
                res.send('password does not match')
            }
        }
    })
})

sessions.delete('/', async (req, res) => {
    req.session.destroy()
})