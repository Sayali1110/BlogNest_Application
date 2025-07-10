const express = require('express');
const router = express.Router();
const Tag = require('../models/Tag');

router.post('/', async (req, res) => {
    try {
        const { tags } = req.body;

        console.log("tags for checking", tags)

      if (!Array.isArray(tags) || tags.length === 0) {
      return res.status(400).json({ message: 'tags must be a non-empty array of strings' });
    }

    const createdTags = await Promise.all(
      tags.map(async tagName => {
        const [tag, created] = await Tag.findOrCreate({
          where: { name: tagName }
        });
        return tag;
      })
    );

        res.status(201).json({ message: 'tags created', createdTags });

    }
    catch (error) {
        console.error("error creating tags", error);
        res.status(500).json({ message: 'internal server error', error });
    }
});

module.exports = router;
