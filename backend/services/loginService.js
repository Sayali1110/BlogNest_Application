const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

async function userLogin(email, password) {

    try {
        console.log("in login service")
        const existingUser = await User.findOne({ where: { email } });
        console.log("existing user" ,existingUser);

        if (!existingUser) {
            return { status: 404, meassage: "User not found" };
        }

        const isMatch = await bcrypt.compare(password, existingUser.password);
        console.log("token matching", isMatch);

        if (!isMatch) {
            return { status: 401, meassage: "Inavlid Password" };
        }

        const token = jwt.sign({ userEmail: existingUser.email }, 'secret-code', { expiresIn: '24h' });
        console.log("token generation for login", token);

        return {existingUser, token};
    }
    catch{
         console.error("Login Error:", err);
        return { error: true, status: 500, message: "Internal server error" };
    }
}

module.exports = userLogin;