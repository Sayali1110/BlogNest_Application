const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function registerUser(username, email, password){
    const hasedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hasedPassword,
    });

    console.log("user", user)
    return user
}

module.exports = {
    registerUser
}