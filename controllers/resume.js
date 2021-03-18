//// DEPENDENCIES ////
const express = require('express')
const resumes = express.Router()

//// MODEL ////
const Resume = require('../models/resume.js')

//// ROUTES ////
//index
resumes.get('/:id', (req, res) => {
    Resume.find({userId: req.params.id}, (error, foundResume) => {
        if (error) {
            res.status(400).json({ error: error.message})
        }
      res.status(200).json(foundResume)
    })
})

//create
resumes.post('/', (req, res) => {
  console.log(req.body)
    Resume.create(req.body, (error, createdResume) => {
        if (error) {
            res.status(400).json({error: error.message})
        }
        res.status(200).json(createdResume)
    })
})

//update
resumes.put('/:id', (req, res) => {
    Resume.findByIdAndUpdate(req.params.id, req.body, { new: true}, (error, updatedResume) => {
      if (error) {
        res.status(400).json({ error: error.message })
      }
      res.status(200).json(updatedResume)
    });
  });

// delete
resumes.delete('/:id', (req, res) => {
    Resume.findByIdAndRemove(req.params.id, (error, deletedResume) => {
      if (error) {
        res.status(400).json( {error: error.message})
      }
      res.status(200).json(deletedResume)
    });
  });

////EXPORT///
module.exports = resumes