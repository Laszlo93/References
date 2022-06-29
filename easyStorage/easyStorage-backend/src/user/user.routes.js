const express = require('express');
const router = express.Router();

const userController = require('./user.controller');

router.post('/add', (req, res, next) => {
    return userController.create(req, res, next);
});

router.get('/users-list', (req, res, next) => {
    return userController.findAll(req, res, next);
});

router.get('/:id', (req, res, next) => {
    return userController.findOne(req, res, next);
});

router.put('/:id', (req, res, next) => {
    return userController.update(req, res, next);
});

router.delete('/:id', (req, res, next) => {
    return userController.delete(req, res, next);
});

module.exports = router;