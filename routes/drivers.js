const express = require('express');
const router = express.Router();
const drivers = require('../services/drivers');


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

module.exports = router;