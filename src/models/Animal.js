const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: 2,
    },

    years: {
        type: Number,
        required: [true, 'You need to specify animal years'],
        min: 1,
        max: 100
    },

    kind: {
        type: String,
        required: [true, 'Kind is required'],
        minlength: 3
    },

    image: {
        type: String,
        required: [true, 'Image Url is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },

    need: {
        type: String,
        required: [true, 'You need to specify what do the animal needs'],
        minlength:3,
        maxLength: 20
    },

    location: {
        type: String,
        required: [true, 'You need to specify location'],
        minlength:5,
        maxLength: 15
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength:5,
        maxLength: 50
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