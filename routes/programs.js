const express = require('express');
const router = express.Router();
const programs = require('../services/programs');

/* GET programming languages. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await programs.getPrograms(req.query.page));
  } catch (err) {
    console.error(`Error while getting programming languages `, err.message);
    next(err);
  }
});

module.exports = router;