const express = require('express');
const router = express.Router();

const historyController = require('./history.controller');

router.post('/add', (req, res, next) => {
    return historyController.create(req, res, next);
});

router.get('/', (req, res, next) => {
    return historyController.findAll(req, res, next);
});

module.exports = router;
