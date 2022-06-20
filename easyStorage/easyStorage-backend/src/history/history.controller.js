const historyService = require('./history.service');
const createError = require('http-errors');

const logger = require('../logger');

const bodyParameters = ['username', 'action', 'name', 'drawingNumber'];

exports.create = async (req, res, next) => {
    console.log(req.body);
    for(parameter of bodyParameters) {
        if(!req.body[parameter]) {
            return next(new createError.BadRequest('Invalid request body'));
        }
    }

    try {
        const history = await historyService.create(req.body);
        res.status(201).json(history);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const history = await historyService.findAll();
        res.json(history);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}
