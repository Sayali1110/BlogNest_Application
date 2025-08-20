const express = require('express');
const router = express.Router();


const { fetchUser, updateUser } = require('../services/fetchUserService');

router.get('/', async (req, res) => {
    try {
        const userEmail = req.user?.userEmail || null;
        console.log("user email ", userEmail);
        const result = await fetchUser(userEmail);
        console.log("result", result);
        res.status(200).json(result);

    } catch (error) {
        console.error("error fetching user details");
        res.status(500).json({ message: "Internal server error", error });
    }
});

router.put('/update', async (req, res) => {
    try {
        const userEmail = req.user?.userEmail || null;
        console.log("user email ", userEmail);

        const {
            username,
            bio,
            profilePictureUrl,
            currentPassword,
            newPassword,
            confirmPassword
        } = req.body;

        const result = await updateUser(userEmail, {
            username,
            bio,
            profilePictureUrl,
            currentPassword,
            newPassword,
            confirmPassword
        });

        console.log("result", result);
        res.status(200).json(result);

    } catch (error) {
        console.error("Error in update:", error);
        res.status(400).json({ error: error.message });
        
    }
});


module.exports = router;