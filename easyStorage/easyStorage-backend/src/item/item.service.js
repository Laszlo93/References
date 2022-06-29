const Item = require('../models/item.model');

exports.create = itemData => {
    const item = new Item(itemData);
    return item.save();
}

exports.findAll = () => Item.find();

exports.findToExport = () => Item.aggregate(
    [
        {
            $project: {
                _id: 0,
                name: "$name",
                drawingNumber: "$drawingNumber",
                customerDrawingNumber: { $cond: ["$customerDrawingNumber", "$customerDrawingNumber", "-"]},
                storageName: "$storage.storageName",
                shelf: "$storage.shelf",
                box: { $cond: ["$storage.box", "$storage.box", "-"]},
                quantity: "$quantity"
            }
        }
    ]
);

exports.findOne = id => Item.findById(id);

exports.update = (id, updatedItem) => Item.findByIdAndUpdate(id, updatedItem, { new: true });

exports.delete = id => Item.findByIdAndDelete(id);