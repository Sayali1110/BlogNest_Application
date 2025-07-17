const { Model } = require('sequelize');
const Tag = require('../models/Tag');
const Article = require('../models/Article');

//fetch tags
const getAllTags = async (id) => {
    if (!id) {
        return await Tag.findAll({
            attributes: ['name'],
        });
    }

    return await Article.findAll({
        where: { id: id },
        attributes: ['tagList'],
    })
}


//creating tag
const createTags = async (tags) => {
    if (!Array.isArray(tags) || tags.length === 0) {
        throw new Error('Tags are empty or not an array');
    }

    const createdTags = await Promise.all(
        tags.map(async (tagName) => {
            const [tag] = await Tag.findOrCreate({
                where: { name: tagName }
            });
            return tag;
        })
    );

    return createdTags;
};

module.exports = {
    getAllTags,
    createTags
};
