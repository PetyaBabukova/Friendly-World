const Animal = require('../models/Animal');
const { login } = require('./userManager');

exports.create = (animalData) => Animal.create(animalData);

exports.getAll = () => Animal.find().lean();

exports.getOne = (animalId) => Animal.findById(animalId);

exports.edit = (animalId, animalData) => Animal.findByIdAndUpdate(animalId, animalData);

exports.delete = (animalId,) => Animal.findByIdAndDelete(animalId);

exports.donate = async (animalId, userId) => {
    const animal = await Animal.findById(animalId);

    if (!animal.donations.includes(userId.toString())) {
        animal.donations.push(userId);
        await animal.save();
    }
    return animal;
};

exports.search = async (search) => {
    let animals = await this.getAll();
    if (search) {
        animals = animals.filter(x => x.location.toLowerCase() === search.toLowerCase());
    }

    return animals
}
