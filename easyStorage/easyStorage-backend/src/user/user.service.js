const User = require('../models/user.model');
const bcrypt = require('bcrypt');

exports.create = async userData => {
    const user = new User(userData);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    return user.save();
}

exports.findAll = () => User.find();

exports.findOne = id => User.findById(id);

exports.update = async (id, updatedUser) => {
    if (updatedUser.password) {
        const salt = await bcrypt.genSalt(10);
        updatedUser.password = await bcrypt.hash(updatedUser.password, salt);
    }
    return User.findByIdAndUpdate(id, updatedUser, { new: true, projection: { password: 0 } });
} 
// exports.update = (id, updatedUser) => User.findByIdAndUpdate(id, updatedUser, { new: true });

exports.delete = id => User.findByIdAndDelete(id);