const itemService = require('./item.service');
const createError = require('http-errors');

const logger = require('../logger');
const Item = require('../models/item.model');

exports.create = async (req, res, next) => {
    const validationErrors = new Item(req.body).validateSync();

    if (validationErrors) {
        return next(new createError.BadRequest(validationErrors));
    }

    try {
        const item = await itemService.create(req.body);
        res.status(201).json(item);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

exports.findAll = async (req, res, next) => {
    try {
        const items = await itemService.findAll();
        res.json(items);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

exports.findToExport = async (req, res, next) => {
    try {
        const exportedItems = await itemService.findToExport();
        res.json(exportedItems);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

exports.findOne = async (req, res, next) => {
    try {
        logger.debug(`HTTP GET REQ with ${req.params.id}`);
        const item = await itemService.findOne(req.params.id);

        if(!item) {
            return next(new createError.NotFound(`Item with ${req.params.id} not found!`));
        }

        res.status(200).json(item);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

exports.update = async (req, res, next) => {
    const validationErrors = new Item(req.body).validateSync({ validateModifiedOnly: true });

    if (validationErrors) {
        return next(new createError.BadRequest(validationErrors));
    }

    try {
        const item = await itemService.update(req.params.id, req.body);

        if(!item) {
            return next(new createError.NotFound(`Item with ${req.params.id} not found!`));
        }

        res.json(item);
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}

exports.delete = async (req, res, next) => {
    try {
        const item = await itemService.delete(req.params.id);

        if(!item) {
            return next(new createError.NotFound(`Item with ${req.params.id} not found!`));
        }

        res.json({});
    } catch (err) {
        logger.error(err);
        return next(new createError.InternalServerError(err));
    }
}