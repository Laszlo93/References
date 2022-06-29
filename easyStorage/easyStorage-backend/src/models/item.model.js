const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    drawingNumber: {
        type: String,
        required: true,
        unique: true
    },
    customerDrawingNumber: String,
    storage: {
        storageName: {
            type: String,
            required: true
        },
        shelf: {
            type: Number,
            required: true
        },
        box: Number
    },
    quantity: Number
},
{
    timestamps: true
});

ItemSchema.plugin(idValidator);

module.exports = mongoose.model('Item', ItemSchema);

