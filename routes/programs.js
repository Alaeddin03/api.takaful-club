const express = require('express');
const router = express.Router();
const programs = require('../services/programs');

/* GET all programs. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await programs.getPrograms(req.query));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

/* POST new program. */
router.post('/', async function(req, res, next) {
  try {
    console.log(req.body);
    res.json(await programs.createProgram(req.body.program));
  } catch (err) {
    console.error(`Error while creating program `, err.message);
    next(err);
  }
});

/* PUT programming language */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await programs.editPrograms(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating programming language`, err.message);
    next(err);
  }
});

module.exports = router;