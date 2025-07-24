const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    followers: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
        allowNull: true,
    },
    following: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        defaultValue: [],
        allowNull: true,
    }
}, {
    timestamps: false,
    tableName: 'Users',
});

module.exports = User;