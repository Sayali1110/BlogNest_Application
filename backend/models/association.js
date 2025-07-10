const Article = require('../models/Article');
const Tag = require('../models/Tag');
const User = require('../models/User')


// One Article has many Tags
Article.hasMany(Tag, { foreignKey: 'articleId', as: 'tags' });

// One Tag belongs to one Article
Tag.belongsTo(Article, { foreignKey: 'articleId', as: 'article' });


//one user has many articles
User.hasMany(Article, { foreignKey: 'email', as: 'articles' });
//one article belongs to one user
Article.belongsTo(User, { foreignKey: 'email', targetKey: 'email', as: 'author' });


module.exports = { User, Article, Tag };

