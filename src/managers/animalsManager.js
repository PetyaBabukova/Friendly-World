const Animal = require('../models/Animal');

exports.create = (animalData) => animal.create(animalData);

exports.getAll= ()=> Animal.find();

exports.getOne = (animalId) => Animal.findById(animalId);

exports.buy = async (animalId, userId) => {
    const animal = await Animal.findById(animalId);
    if (!animal.buy.includes(userId.toString())) {
        animal.buy.push(userId);
        await animal.save();
    }
    return animal;
};

exports.delete = (animalId,) => Animal.findByIdAndDelete(animalId);

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);