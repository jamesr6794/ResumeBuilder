//// DEPENDENCIES ////
const mongoose = require('mongoose')

//// SCHEMA ////
const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, },
    lastName: { type: String, },
    contactInfo: {
        address: String,
        phoneNumber: Number,
        city: String,
        state: String
    }
});

//// EXPORT ////
module.exports = mongoose.model('User', userSchema)