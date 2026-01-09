const User = require('../models/User');
const bcrypt = require('bcryptjs');
const sequelize = require('../db');

const fetchUser = async (email) => {

    console.log("in fetch user service, email:", email);

    if (!email) {
        throw new Error("Email is missing");
    }

    const user = await User.findOne({ where: { email } });
    console.log(user);
    return user;
}

const updateUser = async (email, updates) => {
    if (!email) throw new Error("Email is missing");

    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found");

    const { username, bio, profilePictureUrl, currentPassword, newPassword, confirmPassword } = updates;

    if (username) user.username = username;
    if (bio) user.bio = bio;
    if (profilePictureUrl) user.image = profilePictureUrl;

    if (currentPassword || newPassword || confirmPassword) {

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            throw new Error("Current password is incorrect");
        }

        if(newPassword && !confirmPassword){
             throw new Error("Need to enter confirm password");

        }

        if (newPassword !== confirmPassword) {
            throw new Error("New password and confirm password do not match");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
    }

    await user.save();

    return {
        email: user.email,
        username: user.username,
        bio: user.bio || null,
        image: user.image || null,
    };
};


module.exports = { fetchUser, updateUser };
