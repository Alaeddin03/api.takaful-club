const express = require('express');
const router = express.Router();
const programs = require('../services/programs');
const students = require('../services/students');
const programsStudents = require('../services/programsStudents');


/* GET all programs. */
router.get('/', async function (req, res, next) {
  try {
    data = await programs.getPrograms(req.query);
    res.json(data);
  } catch (err) {
    console.error(`Error while getting all programs `, err.message);
    next(err);
  }
});


// GET current programs
router.get('/current', async function (req, res, next) {
  try {
    data = await programs.getCurrentPrograms(req.query);
    res.json(data);
  } catch (err) {
    console.error(`Error while getting all programs `, err.message);
    next(err);
  }
});


// GET a program by id
router.get('/:id', async (req, res, next) => {
  try {
    res.json(await programs.getProgramById(req.params.id));
  } catch (err) {
    console.error(`Error while getting program `, err.message);
    next(err);
  };
}
);


// POST (create) program
router.post('/', async function (req, res, next) {
  try {
    res.json(await programs.createProgram(req.body.program));
  } catch (err) {
    console.error(`Error while creating program `, err.message);
    next(err);
  }
});


// PUT (edit) program
router.put('/:id', async function (req, res, next) {
  try {
    res.json(await programs.editProgram(req.params.id, req.body.program));
  } catch (err) {
    console.error(`Error while updating program`, err.message);
    next(err);
  }
});


// DELETE program
router.delete('/:id', async function (req, res, next) {

  try {
    await programsStudents.deleteProgramStudentForProgram(req.params.id)
  } catch (err) {
    console.error(`Error while deleting program student for program`, err.message);
    next(err);
  }

  try {
    res.json(await programs.deleteProgram(req.params.id));
  } catch (err) {
    console.error(`Error while deletinging program`, err.message);
    next(err);
  }
  
});


// register student for program
router.post('/:id/register', async function (req, res, next) {
  try {
    await students.createStudent(req.body.student);
  } catch (err) {
    console.error(`Error while creating student for program: student exists,`, err.message);

    try {
      await students.editStudent(req.body.student.id, req.body.student);
    }
    catch (err) {
      console.error(`Error while updating student for program`, err.message);
    }
  }

  try {
    res.json(await programs.registerStudent(req.params.id, req.body.student.id, req.body.neighborhoodId));
  } catch (err) {
    console.error(`Error while registering student for program`, err.message);
    next(err);
  }

});


// get students in a program
router.post('/:id/students', async function (req, res, next) {

  let students = []
  try {
    students = (await programsStudents.getProgramsStudents(`programId = ${req.params.id}`));
    console.log('students', students)
  } catch (err) {
    console.error(`Error while getting students in program`, err.message);
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