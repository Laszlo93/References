const History = require('../models/history.model');
const fs = require('fs');

exports.create = historyData => {
    const history = new History(historyData);
    return history.save();
}

exports.findAll = async (query) => {
    const historyResponse = {}

    historyResponse.numberOfHistoryItems = await History.count();

    historyResponse.historyItems = await History.find()
        .sort({updatedAt: -1})
        .skip(query.numberOfPreviousRows)
        .limit(query.numberOfRows);

    return historyResponse;
}

exports.findFiltered = (filterString) => {
    return History.find({ $or: [{ username: filterString }, { action: filterString }, { name: filterString }, { drawingNumber: filterString }]})
        .sort({updatedAt: -1});
}

exports.findToExport = () => {
    return History.aggregate(
        [
            {
                $sort: {
                    updatedAt: -1
                }
            },
            {
                $project: {
                    _id: 0,
                    username: 1,
                    action: 1,
                    name: 1,
                    drawingNumber: 1,
                    quantityOfChange: 1,
                    createdAt: { $dateToString: { format: "'%Y.%m.%d - %H:%m'", date: "$createdAt" } }
                }
            }
        ]
    );
}