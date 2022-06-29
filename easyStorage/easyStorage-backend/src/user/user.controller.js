const userService = require('./user.service');
const createError = require('http-errors');

const logger = require('../logger');
const User = require('../models/user.model');

exports.create = async (req, res, next) => {
    const validationErrors = new User(req.body).validateSync();

    if (validationErrors) {
        return next(new createError.BadRequest(validationErrors));
    }

    try {
        const user = await userService.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        logger.error(err.code);
        return next(new createError.InternalServerError(err));
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const users = await userService.findAll();
        res.json(users);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

exports.findOne = async (req, res, next) => {
    try {
        logger.debug(`HTTP GET REQ with ${req.params.id}`);
        const user = await userService.findOne(req.params.id);

        if(!user) {
            return next(new createError.NotFound(`User with ${req.params.id} not found!`));
        }

        res.status(200).json(user);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

exports.update = async (req, res, next) => {
    const validationErrors = new User(req.body).validateSync({ validateModifiedOnly: true });

    if (validationErrors) {
        return next(new createError.BadRequest(validationErrors));
    }

    try {
        const user = await userService.update(req.params.id, req.body);

        if(!user) {
            return next(new createError.NotFound(`User with ${req.params.id} not found!`));
        }

        res.json(user);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const user = await userService.delete(req.params.id);

        if(!user) {
            return next(new createError.NotFound(`User with ${req.params.id} not found!`));
        }

        res.json({});
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}