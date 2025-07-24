const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    console.log("auth header", authHeader);

    const token = authHeader && authHeader.split(' ')[1];
    console.log("token", token);


    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        const tokenVerification = jwt.verify(token, 'aligned-automation');
        console.log("token from headers", tokenVerification);

        // req.body.email = tokenVerification.userEmail;
        req.user = tokenVerification;
        console.log(tokenVerification.userEmail, "token for email")
        next();
    }

    catch (error) {
        return res.status(403).json({ message: "Invalid token", error });
    }


}

module.exports = authenticateToken;