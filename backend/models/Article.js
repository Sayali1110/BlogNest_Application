const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Article extends Model { }

Article.init({
  slug: {
    type: DataTypes.STRING,
    allowNull : false,
  },
  title:{
    type: DataTypes.STRING,
    allowNull : false,
    unique: true,
  },
  description: DataTypes.STRING,
  body: DataTypes.TEXT,
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
  favorites: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Article',
  tableName: 'Articles',
  timestamps: true
});


module.exports = Article;