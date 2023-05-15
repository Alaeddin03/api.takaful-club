const express = require('express');
const router = express.Router();
const neighborhood = require('../services/neighborhood');
const { isAuthorized } = require('../helper');

/* GET all programs. */
router.get('/', async function (req, res, next) {
    try {
        data = await neighborhood.getNeighborhoods(req.query);
        res.json(data);
    } catch (err) {
        console.error(`Error while getting all neighborhood `, err.message);
        next(err);
    }
});

// POST (create) Neighborhood
router.post('/', async function (req, res, next) {

    if (!isAuthorized(req.body.role, ['admin'])) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    try {
        res.json(await neighborhood.createNeighborhood(req.body.neighborhood));
    } catch (err) {
        console.error(`Error while creating Neighborhood `, err.message);
        next(err);
    }
});


// DELETE Neighborhood
router.delete('/:id', async function (req, res, next) {

    if (!isAuthorized(req.body.role, ['admin'])) {
        return res.status(403).json({ error: "Unauthorized" });
    }

    try {
        res.json(await neighborhood.deleteNeighborhood(req.params.id));
    } catch (err) {
        console.error(`Error while deleting Neighborhood`, err.message);
        next(err);
    }
});

module.exports = router;