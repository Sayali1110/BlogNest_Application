var express = require('express');
var app = express();
var route = express.Router();

const userLogin = require('../services/loginService');

route.post('/', async (req, res) => {

    const { email, password } = req.body;

    try {
        console.log("in login route");

        const result = await userLogin(email, password);
        console.log("result for function", result)
        if (result.token) {
            console.log("in if condition");
            res.status(200).json({
                user: result,
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