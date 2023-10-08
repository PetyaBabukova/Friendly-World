const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        // minlength: 2,
    },

    years: {
        type: Number,
        required: [true, 'You need to specify animal years'],
        // min: 0,
    },
    
    kind: {
        type: String,
        required: [true, 'Kind is required'],
    },

    image: {
        type: String,
        required: [true, 'Image Url is required'],
        // match: [/^https?:\/\//, 'Invalid URL'],
    },

    need: {
        type: String,
        required: [true, 'You need to specify what do the animal needs'],
    },

    location: {
        type: String,
        required: [true, 'You need to specify location'],
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        // minlength: 10,
    },

    donations: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },


});

const Animal = mongoose.model('Animal', animalSchema);

module.exports = Animal;