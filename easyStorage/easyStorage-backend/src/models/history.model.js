const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const HistorySchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    action: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    drawingNumber: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

HistorySchema.plugin(idValidator);

module.exports = mongoose.model('History', HistorySchema);