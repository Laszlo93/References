const History = require('../models/history.model');

exports.create = historyData => {
    const history = new History(historyData);
    return history.save();
}

exports.findAll = () => History.find();