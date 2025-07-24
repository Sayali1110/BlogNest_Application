const express = require('express');
const router = express.Router();
const { registerUser } = require('../services/userService');

router.post('/', async (req, res) => {
  console.log("in signup route");

  const { username, email, password, bio, image } = req.body.user;

  try {

    console.log("request body from signup route", req.body.user);

    const result = await registerUser(username, email, password, bio, image);
    console.log("user from servie", result);


    const Bio = result?.user?.bio;
    const Image = result?.user?.image;

    const user = { username: result.user.username, bio: Bio, image: Image, token: result.token, email: result.user.email };

    res.status(201).json({ user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

module.exports = router;