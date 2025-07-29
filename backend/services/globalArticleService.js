const { Op } = require('sequelize');
const Article = require('../models/Article');
const User = require('../models/User');
const Tag = require('../models/Tag');
const Comment = require('../models/Comment');

const getGlobalArticles = async (tagName, limit, offset, userID, author, favorited) => {
    console.log("limit and offset received", limit, offset);

    let articles;
    let totalCount;//total articles


    if (tagName) {
        // Fetch articles if tag is present
        console.log("Fetching articles with tag:", tagName);
        const tag = await Tag.findOne({ where: { name: tagName } });

        if (!tag || !tag.articleIdList || tag.articleIdList.length === 0) {
            return { articles: [], articlesCount: 0 };
        }

        totalCount = tag.articleIdList.length;

        articles = await Article.findAll({
            where: { id: tag.articleIdList },
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'username', 'bio', 'image']
                },
            ],
        });
    }

    else if (author) {
        const authorUser = await User.findOne({ where: { username: author } });
        if (authorUser) {
            articles = await Article.findAll({
                where: { userId: authorUser.id },
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['id', 'username', 'bio', 'image']
                    },
                ],
            });
            totalCount = await Article.count({ where: { userId: authorUser.id } });
        } else {
            return { articles: [], articlesCount: 0 };
        }
    }

    else if (favorited) {
        const favoriteUser = await User.findOne({ where: { username: favorited } });

        if (favoriteUser) {
            articles = await Article.findAll({
                where: {
                    favorites: {
                        [Op.contains]: [favoriteUser.id]
                    }
                },
                limit,
                offset,
                order: [['createdAt', 'DESC']],
                include: [
                    {
                        model: User,
                        as: 'author',
                        attributes: ['id', 'username', 'bio', 'image']
                    },
                ],
            });

            totalCount = await Article.count({
                where: {
                    favorites: {
                        [Op.contains]: [favoriteUser.id]
                    }
                }
            });

        } else {
            return { articles: [], articlesCount: 0 };
        }
    }

    // Fetch articles if tag is not present
    else {
        totalCount = await Article.count();

        console.log("Fetching articles without tag");
        articles = await Article.findAll({
            limit: limit,
            offset: offset,
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['id', 'username', 'bio', 'image']
                },
            ],

        });

    }


    const formattedArticles = await Promise.all(articles.map(async (article) => {

        //checking for favorites
        const favoritesArray = article.favorites || [];
        const isFavorited = userID ? favoritesArray.includes(userID) : false;

        //checking for following
        console.log("Articles:", article);
        console.log("auhtor", article.author);

        console.log("auhtor", article.author.id);

        const match = article.author.id;
        const authorUser = await User.findByPk(match);

        const followersArray = authorUser.followers || [];
        console.log("followers", followersArray);
        const isFollowing = userID ? followersArray.includes(userID) : false;

        return {
            slug: article.slug,
            title: article.title,
            description: article.description,
            body: article.body,
            createdAt: article.createdAt,
            updatedAt: article.updatedAt,
            tagList: article.tagList || [],
            author: {
                username: article.author.username,
                bio: article.author.bio,
                image: article.author.image,
                following: isFollowing,
                followersCount: followersArray.length,
            },
            favorited: isFavorited,
            favoritesCount: article.favorites ? article.favorites.length : 0,
        };
    }));

    return {
        articles: formattedArticles,
        articlesCount: totalCount
    };
};




//fethcing comments
const getComments = async (id) => {
    //id- article id
    //user - user
    console.log(" article id ", id);

    //for finding if user is following author or not
    let userID;
    let followersCount = 0;

    // if (user) {
    //     userID = user.id;
    //     console.log("userID ", userID);

    //     followersCount = user.followers ? user.followers.length : 0;
    //     console.log("followers count: ", followersCount);

    // }

  

    const article = await Article.findByPk(id);

    console.log("article for comment", article);

    const authorId = article.userId;

    console.log("author id", authorId);

    const match = await User.findOne({
        where: {
            following: {
                [Op.contains]: [authorId]
            }
        }
    });

    console.log("match", match);

    //
    const comments = await Comment.findAll({
        where: { articleId: id },
        include: [
            {
                model: User,
                as: 'user',
                attributes: ['id', 'username', 'bio', 'image']
            }
        ],
        order: [['createdAt', 'DESC']]
    });

    if (!comments || comments.length === 0) {
        return [];
    }


    const formattedComments = await Promise.all(comments.map(async (comment) => {

        const commentAuthor = comment.user || {};
        const isFollowing = !!match;

        return {
            id: comment.id,
            body: comment.body,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
            author: {
                username: null,
                bio: null,
                image: null,
                following: false,
                followersCount: 0
            }
        };
    }));

    return formattedComments;
};


module.exports = { getGlobalArticles, getComments };
