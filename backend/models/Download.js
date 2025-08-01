const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Download = sequelize.define('Download', {
    articleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references : {
            model : 'Articles',
            key : 'id'
        }
    },
    userId : {
        type : DataTypes.INTEGER,
        allowNull : false,
        references : {
            model :'Users',
            key : 'id'
        }
    },
},{
    timestamps : true,
    tableName : "Downloads",
    modelName : 'Download'
})

module.exports = Download;