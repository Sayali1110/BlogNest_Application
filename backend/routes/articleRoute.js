const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Tag = require('../models/Tag');
const User = require('../models/User');

const { getAllArticles, createArticle } = require('../services/articleService')

router.get('/articles', async (req, res) => {
  try {
    const tagName = req.query.tag;
    const articles = await getAllArticles(tagName);
    res.status(200).json(articles);
  } catch (error) {
    console.error('Error fetching articles:', error);
    res.status(500).json({ message: 'Failed to fetch articles' });
  }
});


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


