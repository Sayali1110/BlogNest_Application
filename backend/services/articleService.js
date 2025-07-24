const Article = require('../models/Article');
const User = require('../models/User');
const Tag = require('../models/Tag');
const Comment = require('../models/Comment');

// const unlikeArticle = async () => {

// }

const likeArticle = async (slug, userID) => {

    const article = await Article.findOne({ where: { slug } });
    console.log("article found", article);
    if (!article) return { error: 'Article not found' };

    const authorId = article.id;
    console.log("author id", authorId);

    const author = await User.findByPk(authorId);

    const favoritesArray = article.favorites || [];
    console.log("initial favoritesArray", favoritesArray);

    let updatedFavorites;
    let favorited;

    console.log("user id fetched", userID);
    if (favoritesArray.includes(userID)) {
        updatedFavorites = favoritesArray.filter(id => id !== userID);
        favorited = false;
    }
    else {
        updatedFavorites = [...favoritesArray, userID];
        favorited = true;
    }

    await article.update({
        favorites: updatedFavorites,
    });

    console.log("updated favoritesArray", favoritesArray);

    return {
        article: {
            slug: article.slug,
            title: article.title,
            description: article.description,
            body: article.body,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
            tagList: article.tagList || [],
            author: {
                username: author.username,
                bio: author.bio,
                image: author.image,
            },
            favorited: favorited,
            favoritesCount: updatedFavorites.length
        }
    };
}



//post article
const createArticle = async (articleData, articleSlug, email) => {
    // const { title, description, body, favoritedCount, favorited, tags } = data;

    const tags = articleData.tagList;

    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }

    const article = await Article.create({
        slug: articleSlug,
        title: articleData.title,
        description: articleData.description,
        body: articleData.body,
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

//creating comment
const createComment = async (data, slug, userID) => {

    const article = await Article.findOne({ where: { slug: slug } });
    console.log("article", article);
    const id = article.id;
    console.log("articleId", id);

    const comment = await Comment.create({
        body: data.body,
        articleId: id,
        userId: userID,
    });

    const fullComment = await Comment.findOne({
        where: { id: comment.id },
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['username', 'bio', 'image', 'following', 'followers'],

            }
        ]
    })

    const formattedComment = {
    
            id: fullComment.id,
            body: fullComment.body,
            updatedAt: fullComment.updatedAt,
            createdAt: fullComment.createdAt,
            author: {
                username: fullComment.user.username,
                bio: fullComment.user.bio || null,
                image: fullComment.user.image || null,
                following: fullComment.user.following.includes(userID),
                followersCount: fullComment.user.followers.length
            }
        
    };




    return { comment: formattedComment };
}



module.exports = { createArticle, createComment, likeArticle};

