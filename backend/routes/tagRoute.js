const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');

router.post('/', async (req, res) => {
  console.log("in tags route");
  try {
    const { tags } = req.body;

    console.log("tags for checking", tags)

    if (!Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ message: 'tags are empty' });
    }

    //accepts array
    const createdTags = await Promise.all(
      tags.map(async tagName => {
        const [tag] = await Tag.findOrCreate({
          where: { name: tagName }
        });
        return tag;
      })
    );


    //single value
    // const tag = await Tag.create({ 
    //   name:tags
    // })


    res.status(201).json({ message: 'tags created', createdTags });

  }
  catch (error) {
    console.error("error creating tags", error);
    res.status(500).json({ message: 'internal server error', error });
  }
});

module.exports = router;
