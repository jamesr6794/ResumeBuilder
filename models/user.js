//// DEPENDENCIES ////
const mongoose = require('mongoose')

//// SCHEMA ////
const userSchema = mongoose.Schema({
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    city: { type: String, default: '' },
    address: { type: String, default: '' },
    state: { type: String, default: '' },
    masterResume: {
        title: { type: String, default: '' },
       
        summery: { type: String, default: '' },
        title: { type: String, default: '' },
        experience: [{
            placeOfWork: { type: String, default: '' },
            yearsWorked: { type: String, default: '' },
            listPoints: { type: String, default: '' }
        }],
        education: [{
            school: { type: String, default: '' },
            yearsAttended: { type: String, default: '' },
            degree: { type: String, default: '' }
        }],
        skills: { type: String, default: '' } 
    }
});

//// EXPORT ////
module.exports = mongoose.model('User', userSchema)