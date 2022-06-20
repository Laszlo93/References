const Item = require('../models/item.model');

exports.create = itemData => {
    const item = new Item(itemData);
    return item.save();
}

exports.findAll = () => Item.find();

exports.findOne = id => Item.findById(id);

exports.update = (id, updatedItem) => Item.findByIdAndUpdate(id, updatedItem, { new: true });

exports.delete = id => Item.findByIdAndDelete(id);