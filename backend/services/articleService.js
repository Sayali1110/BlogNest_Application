const Article = require('../models/Article');
const User = require('../models/User');
const Tag = require('../models/Tag');

const getAllArticles = async (tagName, limit, offset) => {
    console.log("limit and offset received", limit, offset);

    //fetch article if tag is not present
    if (!tagName) {
        console.log("limit and offset", limit, offset)
        return await Article.findAll({
            limit: limit,
            offset: limit * offset,
            order: [['createdAt']],
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['username', 'email', 'bio', 'image']
                },
            ]
        })
    }

    //fetch articles if tag is present
    else {
            const tag = await Tag.findOne({ where: { name: tagName } });
            console.log("Article Id", tag)
            if (!tag) {
                return [];
            }
            return await Article.findAll({
                where: { id: tag.articleIdList },
                limit: limit,
                offset: limit * offset,
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['username', 'email', 'bio', 'image']
                    },
                ]
            });
    }
}


const getAllMyArticles = async (author, limit, offset) => {
    //match username to author = User retun uid
    //from uid find article id = Article return article 
    const user = await User.findOne({ where: { username: author } });
    console.log("username found", user);
    const uId = user.id;
    console.log("userId", uId);

    return await Article.findAll({
        where: { userId: uId },
        limit: limit,
        offset: limit * offset,
    });

}







//post article
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

module.exports = { getAllArticles, createArticle, getAllMyArticles };

