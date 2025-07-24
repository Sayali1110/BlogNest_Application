const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function registerUser(username, email, password, bio, image) {
    console.log("username", username);
    console.log("para received in user service", username, email, password, bio, image);


    const hasedPassword = await bcrypt.hash(password, 10);
    console.log("Parameters received in registerUser:", username, email, password, bio, image);
    
    const user = await User.create({
        username,
        email,
        password: hasedPassword,
        bio,
        image
    });

    const token = jwt.sign({ userEmail: user.email }, 'aligned-automation', { expiresIn: '30d' });
    console.log("token generation for sigup", token);

    return { user, token };
}

module.exports = {
    registerUser
}