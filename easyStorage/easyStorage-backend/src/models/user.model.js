const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    isAdmin: Boolean
},
{
    timestamps: true
});

UserSchema.plugin(idValidator);

module.exports = mongoose.model('User', UserSchema);

