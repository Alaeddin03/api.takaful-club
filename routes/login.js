const express = require('express');
const router = express.Router();
const login = require('../services/login');

router.post('/', async function (req, res, next) {
    try {
        res.json(await login.login(req.body.username, req.body.password));
    } catch (err) {
        console.error(`Error while login `, err.message);
        next(err);
    }
});

module.exports = router;