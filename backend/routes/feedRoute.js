const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const User = require('../models/User');
const Tag = require('../models/Tag');
const Comment = require('../models/Comment');

const getFeedArticles = require('../services/feedService');

router.get('/', async (req, res) => {
    try {
        console.log("in my profile");
        const userEmail = req.user.userEmail;
        console.log("Log in user email:", userEmail);

        const user = await User.findOne({ where: { email: userEmail } });
        console.log("user from Article Table", user);
        const userID = user.id;
        console.log("user iD", userID);

        const limit = req.query.limit || 3;
        const offset = req.query.offset || 0;

        const result = await getFeedArticles(userID, limit, offset);
        res.status(200).json(result);


    } catch (error) {
        console.log("error fetching articles", error); console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Failed to fetch articles' });

    }

})

module.exports = router;