const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');
const { getAllTags, createTags } = require('../services/tagService')

router.get('/', async (req, res) => {
  try {
    const ArticleId = req.query.id;
    const tags = await getAllTags(ArticleId);

   
if (!ArticleId) {
      tagList = tags.map(tag => tag.name);
    } else {
      tagList = tags.length > 0 ? tags[0].tagList : [];
    }

    res.status(200).json({ tags: tagList });

  } catch (error) {
    console.log("error fethcing tags", error);
    res.status(500).json("Internal Server Error");
  }
});


router.post('/tags', async (req, res) => {
  console.log("in tags route");
  try {
    const { tags } = req.body;
    console.log("tags for checking", tags);

    const createdTags = await createTags(tags);
    res.status(201).json({ message: 'tags created', createdTags });

  } catch (error) {
    console.error("error creating tags", error);
    res.status(500).json({ message: 'internal server error', error: error.message });
  }
});
  
module.exports = router;
