const express = require('express');
const router = express.Router();
const drivers = require('../services/drivers');
const programsStudents = require('../services/programsStudents');
const students = require('../services/students');


// GET all drivers
router.get('/', async function (req, res, next) {
    try {
        res.json(await drivers.getDrivers(req.query));
    } catch (err) {
        console.error(`Error while getting all drivers `, err.message);
        next(err);
    }
});


// POST (create) driver
router.post('/', async function (req, res, next) {
    try {
        res.json(await drivers.createDriver(req.body.driver));
    } catch (err) {
        console.error(`Error while creating driver `, err.message);
        next(err);
    }
});


// PUT (edit) driver
router.put('/:id', async function (req, res, next) {
    try {
        res.json(await drivers.updateDriver(req.params.id, req.body.driver));
    } catch (err) {
        console.error(`Error while updating driver`, err.message);
        next(err);
    }
});


// DELETE driver
router.delete('/:id', async function (req, res, next) {
    try {
        res.json(await drivers.deleteDriver(req.params.id));
    } catch (err) {
        console.error(`Error while deleting driver account`, err.message);
        next(err);
    }
});


router.post(':id/assign', async function (req, res, next) {
    
    let driver = []
    try {
        driver = await drivers.getDrivers(`id = ${req.params.id}`)
        console.log('driver', driver)
    } catch (err) {
        console.error('Error while getting driver')
    }

    let students = [];
    try {
        students = await programsStudents.getProgramsStudentByNeighborhood(req.body.programId, req.body.neighborhoodId);
        console.log(students)
    } catch (err) {
        console.error('Error while getting students')
    }


    const maleStudents = []
    const femaleStudents = []

    students.forEach( async student => {
        try{
            const maleStudent = await students.getStudents(`gender = 'male AND id = ${student.student}`)
            maleStudents.push(maleStudent)
        } catch (err) {
            console.error('Error while getting male students', err.message)
        }
        try{
            const femaleStudent = await students.getStudents(`gender = 'female AND id = ${student.student}`)
            femaleStudents.push(femaleStudent)
        } catch (err) {
            console.error('Error while getting female students', err.message)
        }
    })

    const selectedStudents = []

    if (maleStudents.length === 0) {
        selectedStudents = femaleStudents
    } else if (femaleStudents.length === 0) {
        selectedStudents = maleStudents
    } else {
        selectedStudents = maleStudents.length > femaleStudents.length ? maleStudents : femaleStudents
    }

    const studentsToAssign = []
    if (selectedStudents.length > driver.busLimit) {
        for (let i = 0; i < driver.busLimit; i++) {
            studentsToAssign.push(selectedStudents[i])
        }
    }

    studentsToAssign.forEach( async student => {
        try {
            await programsStudents.editDriverForProgramsStudent(req.body.programId, student.id, req.params.id)
        } catch (err) {
            console.error('Error while updating programsStudent', err.message)
        }
    })

    res.json({message: 'Students assigned successfully'})
        
});


// get students for a driver
router.post('/:id/students', async function (req, res, next) {

    let students = []
    try {
      students = (await programsStudents.getProgramsStudents(`driverId = ${req.params.id}`));
      console.log('students', students)
    } catch (err) {
      console.error(`Error while getting students for a driver`, err.message);
      next(err);
    }
  
    let studentData = []
    students.forEach(async (student) => {
      try {
        studentData.push(await students.getStudentById(student.studentId))
      } catch (err) {
        console.error(`Error while getting student`, err.message);
        next(err);
      }
    })
  
    res.json(studentData)
  
  });

module.exports = router;