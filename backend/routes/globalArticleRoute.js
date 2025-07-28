const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');
const Article = require('../models/Article');
const { getGlobalArticles, getComments } = require('../services/globalArticleService');


//fething all articles
router.get('/', async (req, res) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        let userID = null;

        if (token) {
            try {
                const decoded = jwt.verify(token, 'aligned-automation');
                const userEmail = decoded.userEmail;
                const user = await User.findOne({ where: { email: userEmail } });
                if (user) {
                    userID = user.id;
                }
            } catch (err) {
                console.log('Invalid token, proceeding without user context.');
            }
        }

        const tag = req.query.tag;
        const limit = req.query.limit || 3;
        const offset = req.query.offset || 0;

        const author = req.query.author;
        const favorited = req.query.favorited


        console.log("article limit", limit);
        console.log("article offset", offset);

        const articles = await getGlobalArticles(tag, limit, offset, userID, author, favorited);
        res.status(200).json(articles);
    } catch (error) {
        console.error('Error fetching articles:', error);
        res.status(500).json({ message: 'Failed to fetch articles' });
    }
});




//fetching comment
router.get('/:slug/comments', async (req, res) => {
    try {

        console.log("in comments route");

        //extracting user

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        let user = null;


        if (token) {
            try {
                const decoded = jwt.verify(token, 'aligned-automation');
                const userEmail = decoded.userEmail;
                const user = await User.findOne({ where: { email: userEmail } });
                console.log("user inside try", user);

                if (user) {
                    userID = user.id;
                }

                if (author) {
                    const articles = await getArticlesByAuthor(author, limit, offset);
                    return res.status(200).json(articles);
                }

                if (favorited) {
                    const articles = await getFavoritedArticles(favorited, limit, offset);
                    return res.status(200).json(articles);
                }

            } catch (err) {
                console.log('Invalid token, proceeding without user context.');
            }
        }

        const slug = req.params.slug;
        //const userEmail = req.user?.userEmail || null;

        const article = await Article.findOne({ where: { slug } });
        if (!article) {
            return res.status(404).json({ message: "Article not found" });
        }

        const id = article.id;

        const comments = await getComments(id);
        res.status(200).json({ comments });

    } catch (error) {
        console.log("Error fetching comments", error);
        res.status(500).json({ message: "Internal Server Error", error });
    }
});


module.exports = router;