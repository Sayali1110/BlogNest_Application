const { Op } = require('sequelize');
const Article = require('../models/Article');
const User = require('../models/User');
const Tag = require('../models/Tag');
const Comment = require('../models/Comment');

const getGlobalArticles = async (tagName, limit, offset, userID, author, favorited) => {
    console.log("limit and offset received", limit, offset);

    let articles;
    let totalCount;

    let follow;

    if (userID) {
        follow = false;
    } else {
        follow = true;
    }




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
            order: [['createdAt']],
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['username', 'bio', 'image']
                },
            ],
            attributes: {
                exclude: ['userId']
            }
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
                        attributes: ['username', 'bio', 'image']
                    },
                ],
                attributes: {
                    exclude: ['userId']
                }
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
                        attributes: ['username', 'bio', 'image']
                    },
                ],
                attributes: {
                    exclude: ['userId']
                }
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
            order: [['createdAt']],
            include: [
                {
                    model: User,
                    as: 'author',
                    attributes: ['username', 'bio', 'image']
                },
            ],
            attributes: {
                exclude: ['userId']
            }
        });

        console.log("Article favorites:", articles);

    }


    const formattedArticles = articles.map(article => {


        //checking for favorites
        const favoritesArray = article.favorites || [];
        const isFavorited = userID ? favoritesArray.includes(userID) : false;

        //checking for following

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
                following: follow,
                followersCount: 0,
            },
            favorited: isFavorited,
            favoritesCount: article.favorites ? article.favorites.length : 0,
        };
    });

    return {
        articles: formattedArticles,
        articlesCount: totalCount
    };
};




//fethcing comments
const getComments = async (id, user) => {

    console.log("user", user);

    let userID = null;
    let followersCount = 0;

    if (user) {
        userID = user.id;
        console.log("userID ", userID);

        followersCount = user.followers ? user.followers.length : 0;
        console.log("followers count: ", followersCount);

    }
    const article = await Article.findOne({
        where: { userId: id }
    })

    if (!article) {
        console.log("No article found for slug:");
        return [];
    }

    console.log("author", article);

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


        // const followingArray = user.following || [];


        // const isFollowing = currentUser ? currentUser.following.includes(authorId) : false;


        return {
            id: comment.id,
            body: comment.body,
            createdAt: comment.createdAt,
            updatedAt: comment.updatedAt,
            author: {
                username: null,
                bio: null,
                image: null,
                following: isFollowing,
                followersCount: followersCount
            }
        };
    }));

    return formattedComments;
};


module.exports = { getGlobalArticles, getComments };
