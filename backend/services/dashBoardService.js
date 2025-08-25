const { Op } = require('sequelize');

const Article = require('../models/Article');
const User = require('../models/User');
const Tag = require('../models/Tag');
const Comment = require('../models/Comment');
const Download = require('../models/Download');
const sequelize = require('../db');

const fetchDownloadData = async () => {

    const [result, metadata] = await sequelize.query(`select "name", cardinality("articleIdList") as article_count from  "Tags" ORDER By article_count DESC`);
    console.log("result", result);

    const data = await sequelize.query(` select "title", cardinality("favorites") as "likesCount" from "Articles" `);
    console.log("like data", data);

    return result;

}

const fetchData = async () => {

    const [downloadData, metadata] = await sequelize.query(` SELECT  a."title", a."tagList", COUNT(*) AS download_count
    FROM ( SELECT DISTINCT d."userId", d."articleId" FROM "Downloads" d) uniq
    JOIN "Articles" a
    ON a."id" = uniq."articleId"
    GROUP BY a."id", a."title", a."tagList"
    ORDER BY download_count DESC;
`);

    return downloadData.map(item => ({
        ...item,
        download_count: Number(item.download_count)
    }));
}

const downloadActivity = async () => {

    const [downloadActivityData, metadata] = await sequelize.query(`
    SELECT d.id, d."createdAt", u."username", a."title", a."description"
    FROM "Downloads" d
    JOIN "Users" u
    ON d."userId" = u."id"
    JOIN "Articles" a 
    ON d."articleId" = a."id"
    ORDER BY d."createdAt" DESC;
`);
    return downloadActivityData;
}

const totalLikes = async () => {
    const [data, result] = await sequelize.query(`
        SELECT "title",cardinality("favorites") as likes
        FROM "Articles"
        ORDER BY "likes" DESC nulls last
        `);

    return data;

}

module.exports = { fetchDownloadData, fetchData, downloadActivity, totalLikes};