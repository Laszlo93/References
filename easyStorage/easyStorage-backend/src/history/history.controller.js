const historyService = require('./history.service');
const createError = require('http-errors');

const logger = require('../logger');
const History = require('../models/history.model');

exports.create = async (req, res, next) => {
    const validationErrors = new History(req.body).validateSync();

    if (validationErrors) {
        return next(new createError.BadRequest(validationErrors));
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
        const history = await historyService.findAll(req.query);
        res.json(history);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

exports.findToExport = async (req, res, next) => {
    try {
        const exportedHistory = await historyService.findToExport();
        res.json(exportedHistory);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

exports.findFiltered = async (req, res, next) => {
    let filterString;

    if (req.query.filter) {
        filterString = new RegExp('.*' + req.query.filter + '.*', 'i');
    }
    
    try {
        const history = await historyService.findFiltered(filterString);
        res.json(history);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}
