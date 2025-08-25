const express = require('express');
const router = express.Router();

const { fetchDownloadData, fetchData, downloadActivity, totalLikes } = require('../services/dashBoardService');

router.get('/pieChart', async (req, res) => {
    try {
        const data = await fetchDownloadData();
        console.log("data after fethcing", data);
        res.status(200).json(data);
    } catch (error) {
        console.error("error fetching total articles data");
        res.status(500).json({ message: "Internal server error", error });
    }
});


router.get('/barChart', async (req, res) => {
    try {
        const data = await fetchData();
        console.log("data after fethcing", data);
        res.status(200).json(data);
    } catch (error) {
        console.error("error fetching downloaded articles data");
        res.status(500).json({ message: "Internal server error", error });
    }
});

router.get('/downloadActivity', async (req, res) => {
    try {
        const data = await downloadActivity();
        console.log("all download history", data);
        res.status(200).json(data);
    } catch (error) {
        console.error("error fetching downloaded articles activity");
        res.status(500).json({ message: "Internal server error", error });

    }
})

router.get('/mostLikedArticles', async (req, res) => {
    try {
        const data = await totalLikes();
        console.log("all download history", data);
        res.status(200).json(data);
    } catch (error) {
        console.error("error fethcing most liked articles");
        res.status(500).json({ message: "Internal Server Error", error });
    }

})
module.exports = router;