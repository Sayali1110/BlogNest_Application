const sequelize = require('../db');
const User = require('../models/User')
const Article = require('../models/Article');
const Tag = require('../models/Tag');


Article.belongsTo(User, { foreignKey: 'userId', as: 'author' });
User.hasMany(Article, { foreignKey: 'userId', as: 'articles' });

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






// Article.hasMany(Tag, { foreignKey: 'articleId', as: 'tags' });
// Tag.belongsTo(Article, { foreignKey: 'articleId', as: 'article' });

module.exports = { User, Article, Tag };

