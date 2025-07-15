const Article = require('../models/Article');
const User = require('../models/User');
const Tag = require('../models/Tag');

const getAllArticles = async (tagName) => {

    if (!tagName) {
        return await Article.findAll({
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['username', 'email', 'bio', 'image']
                },
                {
                    model: Tag,
                    as: 'tags',
                    attributes: ['name'],
                    through: { attributes: [] }
                }
            ]
        });
    };
    //find article Id with maatching tag
    //fetch articles from that tag
    const tag = await Tag.findOne({ where: { name: tagName } });
    console.log("Article Id", tag)
    if (!tag) {
        return [];
    }
    return await Article.findAll({
        where: { id: tag.articleIdList },
        include: [
            {
                model: User,
                as: 'author',
                attributes: ['username', 'email', 'bio', 'image']
            }
        ]
    });
}



const createArticle = async (data) => {
    const { slug, title, description, body, favoritedCount, favorited, email, tags } = data;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }

    const article = await Article.create({
        slug,
        title,
        description,
        body,
        favoritedCount,
        favorited,
        userId: user.id,
        tagList: tags
    });

    if (Array.isArray(tags)) {
        await Promise.all(tags.map(async (tagName) => {
            const existingTag = await Tag.findOne({ where: { name: tagName } });

            if (existingTag) {
                const updatedList = [...(existingTag.articleIdList || []), article.id];
                await existingTag.update({ articleIdList: updatedList });
            } else {
                await Tag.create({ name: tagName, articleIdList: [article.id] });
            }
        }));
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
                attributes: ['name'],
                through: { attributes: [] }
            }
        ]
    });

    const transformedArticle = { ...fullArticle.toJSON() };
    delete transformedArticle.tags;

    return { message: "Article created successfully", article: transformedArticle };
};

module.exports = { getAllArticles, createArticle };

