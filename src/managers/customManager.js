const Custom = require('../models/Custom');

exports.create = (customData) => Custom.create(customData);

exports.getAll= ()=> Custom.find();

exports.getOne = (customId) => Custom.findById(customId);

exports.buy = async (customId, userId) => {
    const custom = await Custom.findById(customId);
    if (!custom.buy.includes(userId.toString())) {
        custom.buy.push(userId);
        await custom.save();
    }
    return custom;
};

exports.delete = (customId,) => Custom.findByIdAndDelete(customId);

exports.edit = (customId, customData) => Custom.findByIdAndUpdate(customId, customData);