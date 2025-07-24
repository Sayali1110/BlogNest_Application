const { DataTypes } = require('sequelize');
const sequelize = require('../db'); 

const Tag = sequelize.define('Tag',{
  name:{
    type: DataTypes.STRING,
    allowNull: true,
  },
   articleIdList: {//added
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: true
  },
},{
  timestamps: false,
  tableName: 'Tags'
});

module.exports = Tag;