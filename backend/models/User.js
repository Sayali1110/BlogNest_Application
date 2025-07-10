const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/blognest');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        primaryKey: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    bio: {
        type:DataTypes.TEXT,
        allowNull: true,
    },
     image: {
        type:DataTypes.STRING,
        allowNull: true,
    },
}, {
    timestamps: false
});

sequelize.sync().then(() => {
  console.log(" User Database synced successfully");
});

module.exports = User;
