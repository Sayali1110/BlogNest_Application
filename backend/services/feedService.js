const Article = require('../models/Article');
const User = require('../models/User');

//fetch articles for your feed
const getFeedArticles = async (userID, limit, offset) => {
    console.log("user ID from service", userID);
    console.log("limit from service", limit);
    console.log("offset from service", offset);

    //find ids of user this user follows(user table)
    //following 

    const user = await User.findByPk(userID);
    console.log("user from service", user);

    const followingId = user.following || [];
    console.log("following", followingId);
    if (followingId.length === 0) {
        return {
            articles: [],
            articlesCount: 0
        };
    }

    const followersLength = user.followers.length;
    console.log("followersLength", followersLength);

    //find id that match with userID

    const article = await Article.findOne({ where: { userId: followingId } });
    console.log("article", article);


    const authorId = article.userId;

    //total articles

    const totalArticlesCount = await Article.count({
        where: { userId: authorId }
    });

    //find in Articles, likes column if userID and id matched in array then - true
    //count array length - favoritesCount





    const articlesFromFollowedAuthor = await Article.findAll({
        order: [['createdAt']],
        where: { userId: authorId },
        limit: limit,
        offset: offset,
        include: [
            {
                model: User,
                as: 'author',
                attributes: ['username', 'email', 'bio', 'image']
            },
        ]
    });






    const formattedArticles = articlesFromFollowedAuthor.map(article => ({

        slug: article.slug,
        title: article.title,
        description: article.description,
        body: article.body,
        createdAt: article.createdAt,
        updatedAt: article.updatedAt,
        tagList: article.tagList,
        author: {
            username: article.author.username,
            bio: article.author.bio,
            image: article.author.image,
            following: Array.isArray(followingId) && article.author?.id ? followingId.includes(article.author.id) : false,
            followersCount: followersLength || 0,

        },
        favorited: Array.isArray(article.favorites) ? article.favorites.includes(userID) : false,
        favoritesCount: article.favorites?.length || 0
    }))

    return {
        articles: formattedArticles,
        articlesCount: totalArticlesCount
    };

}

module.exports = getFeedArticles;