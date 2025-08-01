const sequelize = require('../db');
const User = require('../models/User')
const Article = require('../models/Article');
const Tag = require('../models/Tag');
const Comment = require('../models/Comment');
const Download = require('./Download');

//one to one
Article.belongsTo(User, { foreignKey: 'userId', as: 'author' });
//one to many
User.hasMany(Article, { foreignKey: 'userId', as: 'articles' });

//Many to Many 
Article.belongsToMany(Tag, {
  through: 'ArticleTags',
  as: 'tags',
  foreignKey: 'articleId',
});
Tag.belongsToMany(Article, {
  through: 'ArticleTags',
  as: 'articles',
  foreignKey: 'tagId',
});

//one article has many comments
Article.hasMany(Comment, {foreignKey: 'articleId', as: 'Comments'});
//one comment has one article
Comment.belongsTo(Article, {foreignKey:'articleId', as:'articles'});
//one comment celongs to one user
Comment.belongsTo(User,{foreignKey:'userId', as: 'user'} );


//one article can downloaded many times
Article.hasMany( Download, {foreignKey: 'articleId', as : 'articles'});
//one user has may downloads
User.hasMany (Download,{foreignKey: 'userId', as: 'users'});
//one download - has one article
Download.belongsTo( Article, {foreignKey: 'articleId', as: 'users'});
//one download - has one user

module.exports = { User, Article, Tag, Download };

