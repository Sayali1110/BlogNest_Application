const express = require('express');
const router = express.Router();

const Article = require('../models/Article');
const Tag = require('../models/Tag');
const User = require('../models/User');

const jwt = require('jsonwebtoken');

const { followAuthor } = require('../services/profileService');

router.post('/:slug/follow', async (req, res) => {

    //found user
    const userEmail = req.user.userEmail;
    console.log("Log in user email:", userEmail);

    const user = await User.findOne({ where: { email: userEmail } });
    console.log("user from Article Table", user);
    const userID = user.id;
    console.log("user iD", userID);

    const articleAuthor = req.params.slug;


    const result = await followAuthor(articleAuthor, userID);
    res.status(201).json(result);

});

module.exports = router;
