const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();

const { registerUser } = require('../services/userService')


router.post('/', async (req, res) => {

    const { username, email, password } = req.body;

    try {
        await registerUser(username, email, password);
        res.status(201).json({ message: 'User Registered Successfully' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error registering user' });
    }
});

module.exports = router;