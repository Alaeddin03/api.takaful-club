const express = require('express');
const router = express.Router();
const programs = require('../services/programs');


/* GET all programs. */
router.get('/', async function (req, res, next) {
  try {
    data = await programs.getPrograms(req.query);
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error(`Error while getting all programs `, err.message);
    next(err);
  }
});


// GET current programs
// where regestrationDateTime > now()


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
    console.log(req.body);
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
    res.json(await programs.deleteProgram(req.params.id));
  } catch (err) {
    console.error(`Error while deletinging program`, err.message);
    next(err);
  }
});


module.exports = router;