const { Op } = require('sequelize');

const Article = require('../models/Article');
const User = require('../models/User');
const Tag = require('../models/Tag');
const Comment = require('../models/Comment');
const Download = require('../models/Download');
const sequelize = require('../db');

const likeArticle = async (slug, userID) => {
    //slug-article
    //user

    const article = await Article.findOne({ where: { slug } });
    console.log("article found", article);
    if (!article) return { error: 'Article not found' };

    const authorId = article.userId;
    console.log("author id", authorId);

    const author = await User.findByPk(authorId);
    console.log("author from favorites", author);

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

//update article
const deleteArticle = async (slug) => {
    const article = await Article.findOne({ where: { slug: slug } });
    if (!article) {
        res.status(403).json({ message: "article not found" });
    }
    article.destroy();

    return {
        message: {
            body: ["Article deleted successfully"]
        }
    }


}

//upadte article
const updateArticle = async (slug, articleData, user) => {
    console.log("user get for mathcing", user);
    const userID = user.id;

    console.log("slug", slug);
    const article = await Article.findOne({ where: { slug: slug } });

    if (!article) {
        return ({ message: "article not found" });
    }

    //checking followers
    const followersArray = user.followers;
    const followers = followersArray.includes(article.userId);

    //checking favorites
    const favoritesArray = article.favorites || [];
    const favorites = favoritesArray.includes(userID);
    console.log("favorites finds", favorites);


    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-+|-+$/g, '');
    };


    const { title, description, body, tagList } = articleData.article;


    if (title) {
        article.title = title;
        article.slug = generateSlug(title);
    }
    if (description) article.description = description;
    if (body) article.body = body;
    if (tagList) article.tagList = tagList;

    await article.save();
    console.log("new article in service ", article);
    console.log("user ID", article.userId);

    const author = await User.findByPk(article.userId);
    console.log("author from upadte service", author);

    //return article;
    return {
        slug: article.slug,
        title: article.title,
        description: article.description,
        body: article.body,
        createdAt: article.createdAt,
        updateAt: article.updateAt,
        tagList: article.tagList,
        author: {
            username: author.username || null,
            bio: author.bio || null,
            image: author.image || null,
            following: followers || false,
            followersCount: author.followers.length || 0
        },
        favorited: favorites || false,
        favoritesCount: article.favorites.length || 0
    }
}

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

const downloadArticle = async (slug, userEmail) => {

    const article = await Article.findOne({ where: { slug } });
    console.log("download article", article);

    if (!article) {
        console.log("article not found");
    }

    const user = await User.findOne({ where: { email: userEmail } });
    console.log("user downloading", user);
    console.log("user downloading", user.id);

    const download = await Download.create({
        articleId: article.id,
        userId: user.id
    });

    //raw query for finding count of downloaded article
    const [result, metadata] = await sequelize.query('select * from "Downloads"');
    console.log("raw query", result);
    console.log("matadat", metadata);

    const [count, data] = await sequelize.query(' select count(distinct ("articleId", "userId")) from  "Downloads" group by "articleId" ') ;
    console.log("count:",count);

    //raw query for finding count of articles for each tag
   // const [] = await sequelize.query('');

    return article;
}

module.exports = { createArticle, createComment, likeArticle, deleteArticle, updateArticle, downloadArticle };

