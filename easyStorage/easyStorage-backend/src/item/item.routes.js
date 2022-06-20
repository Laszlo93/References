const express = require('express');
const router = express.Router();

const itemController = require('./item.controller');
const adminOnly = require('../auth/adminOnly');

router.post('/add', adminOnly, (req, res, next) => {
    return itemController.create(req, res, next);
});

router.get('/items-list', (req, res, next) => {
    return itemController.findAll(req, res, next);
});

router.get('/:id', adminOnly, (req, res, next) => {
    return itemController.findOne(req, res, next);
});

router.put('/:id', adminOnly, (req, res, next) => {
    return itemController.update(req, res, next);
});

router.delete('/:id', adminOnly, (req, res, next) => {
    return itemController.delete(req, res, next);
});

module.exports = router;