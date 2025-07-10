const { DataTypes, Model } = require('sequelize');
const sequelize = require('../db');

class Article extends Model {}

Article.init({
  slug: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.STRING,
  body: DataTypes.TEXT,
  favoritedCount: DataTypes.INTEGER,
  favorited: DataTypes.BOOLEAN,
  email: {  
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'email'
    }
  },
  // tag:{
  //   type:DataTypes.STRING,
  //   allowNull: true,
  //   references :{
  //     model: "Tags",
  //     key:"id"
  //   }
  // }
 
}, {
  sequelize,
  modelName: 'Article',
//  table: 'articles',
  timestamps: true
});

sequelize.sync().then(() => {
  console.log("Article Database synced successfully");
});

module.exports = Article;
