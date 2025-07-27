const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Tag = require('../models/Tag');
const User = require('../models/User');

const jwt = require('jsonwebtoken');

const { createArticle, createComment, likeArticle, deleteArticle, updateArticle } = require('../services/articleService');
const { getComments } = require('../services/globalArticleService');

//giving like
router.post('/:slug/favorites', async (req, res) => {
  const userEmail = req.user.userEmail;
  console.log("Log in user email:", userEmail);

  const user = await User.findOne({ where: { email: userEmail } });
  console.log("user from Article Table", user);
  const userID = user.id;
  console.log("user iD", userID);

  const slug = req.params.slug;

  const result = await likeArticle(slug, userID);
  res.status(201).json(result);
});


//posting comment
router.post('/:slug/comments', async (req, res) => {
  try {

    const userEmail = req.user.userEmail;
    // const user = req.user;
    // console.log("user", user);
    console.log("Log in user email:", userEmail);

    const user = await User.findOne({ where: { email: userEmail } });
    console.log("user from Article Table", user);
    const userID = user.id;
    console.log("user iD", userID);

    const data = req.body;
    const slug = req.params.slug;
    console.log("data:", data);
    console.log("slug:", slug);

    const body = data.body || data.comment?.body;

    if (!body) {
      return res.status(400).json({ message: "Comment body is required" });
    }

    const result = await createComment({ body }, slug, userID);
    res.status(201).json(result);

  } catch (error) {
    console.log("Error posting comment", error);
    res.status(500).json({ message: "Internal Server Error", error });

  }
})

//fetching comment
router.get('/:slug/comments', async (req, res) => {
  try {
    const slug = req.params.slug;
    const userEmail = req.user?.userEmail || null;

    const article = await Article.findOne({ where: { slug } });
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    const comments = await getComments(article.id, userEmail);
    res.status(200).json({ comments });

  } catch (error) {
    console.log("Error fetching comments", error);
    res.status(500).json({ message: "Internal Server Error", error });
  }
});

//posting single article
router.post('/', async (req, res) => {

  try {

    const userEmail = req.user?.userEmail || null;
    console.log("user email for new article", userEmail);

    const articleData = req.body.article;

    console.log("title", articleData);

    const slug = articleData.title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const result = await createArticle(articleData, slug, userEmail);
    res.status(201).json(result);
  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});


//deleting article
router.delete('/:slug', async (req, res) => {
  try {

    const { slug } = req.params;

    console.log("delete article", slug);

    const article = deleteArticle(slug);

    res.status(200).json(article);


  } catch (error) {
    console.error("error deleting article", error);
    res.status(500).json({ message: "Internal server error" });
  }
})

//updating article
router.put('/:slug', async (req, res) => {
  const userEmail = req.user?.userEmail || null;

  const user = await User.findOne({ where: {email: userEmail}});
  console.log("user found for upasting", user);

  const { slug } = req.params;

  const articleData = req.body;

  try {

    const updatedArticle = await updateArticle(slug, articleData);
    console.log("afet upadted article", updatedArticle);

    const newSlug = updatedArticle.slug;
    console.log("new slug", newSlug);

    try {
      await getComments(updatedArticle.id, user);
    } catch (commentError) {
      console.error("Failed to fetch comments:", commentError.message);
    }


    return res.json({
      message: "Article updated successfully",
      article: updatedArticle
    });

  }
  catch (error) {
    console.error("error", error);
    return res.status(500).json({ message: "Internal server error" });
  }

})





module.exports = router;
