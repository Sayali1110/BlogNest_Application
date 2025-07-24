var express = require('express');
var app = express();
var route = express.Router();

const userLogin = require('../services/loginService');

route.post('/', async (req, res) => {

    const { email, password } = req.body.user;

    try {
        console.log("in login route");

        const result = await userLogin(email, password);
        console.log("result for login ", result);

        const bio = result?.existingUser?.bio;
        const image = result?.existingUser?.image;

        const user = { username: result.existingUser.username, bio: bio, image: image, token: result.token, email: result.existingUser.email };

        if (result.token) {
            console.log("in if condition");
            res.status(200).json({
                user
            });
        }
        else {
            res.status(500).json({ message: "error in token generation " })
        }
    }
    catch (error) {
        console.error("Login failed:", error);
        res.status(500).json({ message: "error in login " })
    }
})

module.exports = route;