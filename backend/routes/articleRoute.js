const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const Tag = require('../models/Tag');
const User = require('../models/User');

router.post('/', async (req, res) => {
  try {
    console.log("in article route body", req.body);

    const { slug, title, description, body, favoritedCount, favorited, email, tags } = req.body;

    console.log("email:", req.body.email);
    console.log("tag: ", req.body.tags);
    console.log("body:", req.body.body);

    const user = await User.findOne({ where: { email: req.body.email } });
    console.log("user from article", user);



    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const article = await Article.create({
      slug,
      title,
      description,
      body,
      favoritedCount,
      favorited,
      email,
    });
    if (Array.isArray(tags)) {
      await Promise.all(
        tags.map(tagName =>
          Tag.create({ name: tagName, articleId: article.id })
        )
      );
    }

    const fullArticle = await Article.findOne({
      where: { id: article.id },
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['email', 'username', 'bio', 'image']
        },
        {
          model: Tag,
          as: 'tags',
          attributes: ['name']
        }
      ]
    });

    const transformedArticle = {
      ...fullArticle.toJSON(),
      tags: fullArticle.tags.map(tag => tag.name)
    };



    res.status(201).json({ message: "Article created successfully", article: transformedArticle });

  } catch (error) {
    console.error("Error creating article:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
