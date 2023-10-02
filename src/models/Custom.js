const mongoose = require('mongoose');

const customSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: 2,
    },

    image: {
        type: String,
        required: [true, 'Image Url is required'],
        match: [/^https?:\/\//, 'Invalid URL'],
    },

    price: {
        type: Number,
        required: [true, 'You need to specify price'],
        min: 1,
    },

    description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: 10,
    },

    payment: {
        type: String,
        required: [true, 'You need to specify Payment method']
    },

    buy: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],

    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },


});

const Custom = mongoose.model('Custom', customSchema);

module.exports = Custom;