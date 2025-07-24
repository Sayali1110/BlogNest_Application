const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Comment = sequelize.define('Comment', {
    body: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    articleId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "Articles",
            key :"id",
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model : "Users",
            key : "id",
        }
    },
}, {
    timestamps: true,
    tableName: "Comments",
    modelName: "Comment"

})

module.exports = Comment;
