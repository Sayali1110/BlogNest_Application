const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Tag = require('../models/Tag');
const User = require('../models/User');

const { getAllArticles, createArticle, getAllMyArticles } = require('../services/articleService')

router.get('/articles', async (req, res) => {
  try {
    const tag = req.query.tag;
    const limit = req.query.limit || 3;
    const offset = req.query.offset || 0;


    console.log("article limit", limit);
    console.log("article offset", offset);

    const articles = await getAllArticles(tag, limit, offset);
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
});

router.get('/feed', async (req, res) => {
  try {
    const author = req.query.author;
    const limit = req.query.limit;
    const offset = req.query.offset;
    const articles = await getAllMyArticles(author, limit, offset);
    res.status(200).json(articles);
  }
  catch (error) {
    console.log("error fetching feed", error);
    res.status(500).json("internal server error");
  }
})


router.post('/article', async (req, res) => {
  try {
    const articleData = req.body;
    const result = await createArticle(articleData);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;


