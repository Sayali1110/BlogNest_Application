const Article = require('../models/Article');
const User = require('../models/User');
const Tag = require('../models/Tag');
const Comment = require('../models/Comment');

const followAuthor = async (articleAuthor, userID) => {

    //user Table
    //user
    //in following - {author}
    //in followers -

    //author
    //following 
    //followers  - {user}

    //found author from slug

    console.log("author", articleAuthor);

    const authorArticle = await User.findOne({ where: { username: articleAuthor } });
    console.log("author found ", authorArticle);

    const authorId = authorArticle.id;
    console.log(authorId, "author id");
    console.log(userID, "user id");

    if (authorId == userID) {
        return { error: "You cannot follow yourself." };
    }

    const user = await User.findByPk(userID);
    console.log("user", user);
    const author = await User.findByPk(authorId);
    console.log("author", author);


    const userFollowing = user.following || [];
    const authorFollowers = author.followers || [];

    let isFollowing;


    if (userFollowing.includes(authorId)) {
        // Unfollow
        user.following = userFollowing.filter(id => id !== authorId);
        author.followers = authorFollowers.filter(id => id !== userID);
        isFollowing = false;
    } else {
        // Follow
        user.following = [...userFollowing, authorId];
        author.followers = [...authorFollowers, userID];
        isFollowing = true;
    }

    await user.save();
    await author.save();

    return {
        profile: {
            username: author.username,
            bio: author.bio,
            image: author.image,
            following: isFollowing,
            followersCount: author.followers.length
        }
    };

};



module.exports = { followAuthor };


