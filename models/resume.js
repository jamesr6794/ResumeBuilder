//// DEPENDENCIES ////
const mongoose = require('mongoose')

//// SCHEMA ////
const resumeSchema = mongoose.Schema({
    userId: { type: String },
    title: { type: String },
    summary: { type: String },
    // experience: [{
        placeOfWork: { type: String },
        yearsWorked: { type: String },
        listPoints: { type: String },
    //  }],
    // education: [{
        school: { type: String },
        yearsAttended: { type: String },
        degree: { type: String },
    // }],
    skills: { type: String } 
})

//// EXPORT ////
module.exports = mongoose.model('Resume', resumeSchema)