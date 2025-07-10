const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/blognest');

const Tag = sequelize.define('Tag',{
  name:{
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
   articleId: {
    type: DataTypes.INTEGER,
    allowNull: true
  }
},{
  timestamps: false
});

sequelize.sync({force: true}).then(() => {
  console.log(" Tag Database synced successfully");
});

module.exports = Tag;