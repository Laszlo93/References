const express = require('express');
const router = express.Router();

const itemController = require('./item.controller');
const authenticationByJWT = require('../auth/authenticate');
const adminHandler = require('../auth/adminOnly');


router.post('/add', authenticationByJWT, adminHandler, (req, res, next) => {
    return itemController.create(req, res, next);
});

router.get('/items-list', (req, res, next) => {
    return itemController.findAll(req, res, next);
});

router.get('/export', (req, res, next) => {
    return itemController.findToExport(req, res, next);
});

router.get('/:id', authenticationByJWT, adminHandler, (req, res, next) => {
    return itemController.findOne(req, res, next);
});

router.put('/:id', authenticationByJWT, (req, res, next) => {
    return itemController.update(req, res, next);
});

router.delete('/:id', authenticationByJWT, adminHandler, (req, res, next) => {
    return itemController.delete(req, res, next);
});

module.exports = router;