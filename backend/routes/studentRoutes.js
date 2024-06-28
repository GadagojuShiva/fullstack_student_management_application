const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Add a student
router.post('/', async (req, res) => {
  const { name, age, dob, branch, email, phone } = req.body;
  console.log('Received data:', { name, age, dob, branch, email, phone });
  try {
    const newStudent = new Student({ name, age, dob, branch, email, phone });
    await newStudent.save();
    res.status(201).send('Submitted successfully');
  } catch (error) {
    console.error('Error saving student:', error);
    res.status(500).send('Server error');
  }
});

// Search a student
router.get('/:name', async (req, res) => {
  const { name } = req.params;
  console.log('Searching for student:', name);
  try {
    const student = await Student.findOne({ name });
    if (!student) {
      return res.status(404).send('Details not found');
    }
    res.json(student);
  } catch (error) {
    console.error('Error searching for student:', error);
    res.status(500).send('Server error');
  }
});

module.exports = router;

