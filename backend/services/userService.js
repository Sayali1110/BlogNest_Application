const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function registerUser(username, email, password, bio, image) {
    console.log("para received", username, email, password, bio, image);

    const hasedPassword = await bcrypt.hash(password, 10);
    console.log("Parameters received in registerUser:", username, email, password, bio, image);
    
    const user = await User.create({
        username,
        email,
        password: hasedPassword,
        bio,
        image
    });

    const token = jwt.sign({ userEmail: user.email }, 'secret-code', { expiresIn: '24h' });
    console.log("token generation for sigup", token);

    return { user, token };
}

module.exports = {
    registerUser
}