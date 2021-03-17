//// DEPENDENCIES ////
const mongoose = require('mongoose')

//// SCHEMA ////
const resumeSchema = mongoose.Schema({
    title: { type: String },
    summary: { type: String },
    experience: [{
        placeOfWork: { type: String, required: true },
        yearsWorked: { type: String, required: true },
        listPoints: { type: String }
     }],
    education: [{
        school: { type: String },
        yearsAttended: { type: String },
        degree: { type: String }
    }],
    skills: { type: String } 
})

//// EXPORT ////
module.exports = mongoose.model('Resume', resumeSchema)