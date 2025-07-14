const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Article extends Model { }

Article.init({
  slug: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  body: DataTypes.TEXT,
  favoritedCount: DataTypes.INTEGER,
  favorited: DataTypes.BOOLEAN,
  tagList: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
}, {
  sequelize,
  modelName: 'Article',
  timestamps: true
});


module.exports = Article;