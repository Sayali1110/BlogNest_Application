const express = require('express');
const router = express.Router();
const { registerUser } = require('../services/userService');

router.post('/', async (req, res) => {
  console.log("in signup route");

  const { username, email, password, bio, image } = req.body;

  try {
    console.log("in sigunp router");

    const result = await registerUser(username, email, password, bio, image);
    console.log("user from servie", result);

    const Bio = result?.user?.bio;
    const Image = result?.user?.image;

    const User = { username: result.user.username, bio: Bio, image: Image, token: result.token, email: result.user.email };

    res.status(201).json({ User });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

module.exports = router;