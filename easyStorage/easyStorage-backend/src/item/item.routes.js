const express = require('express');
const router = express.Router();

const itemController = require('./item.controller');

router.post('/add', (req, res, next) => {
    return itemController.create(req, res, next);
});

router.get('/items-list', (req, res, next) => {
    return itemController.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
    return itemController.findOne(req, res, next);
});

router.put('/:id', (req, res, next) => {
    return itemController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    return itemController.delete(req, res, next);
});

module.exports = router;