const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config')

exports.login = async (email, password) => {
    // Find user
    const user = await User.findOne({email});

    if (!user) {
        throw new Error('Invalid user or password!');
    };

    // Validate password with hash
    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error('Invalid user or password!');
    };

    const token = await generateToken(user);
    return token;

};

exports.register = async (userData) => {
const user = await User.findOne({ email: userData.email });

if (user) {
    throw new Error('Email already exissts!')
};

const createdUser = await User.create(userData);
const token = await generateToken(createdUser);
return token;
};

async function generateToken(user) {
    // Generate jwt
    const playload = {
        _id: user._id,
        email: user.email
    }

    const token = await jwt.sign(playload, SECRET, { expiresIn: '2d' });
    return token;
};
