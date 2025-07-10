const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    console.log(req.headers,"headers")

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    
    try {
        const tokenVerification = jwt.verify(token, 'secret-code');
        console.log("token from headers", tokenVerification);
        req.body.email = tokenVerification.userEmail;
        console.log(tokenVerification,"toe")
        next();
    }

    catch (error) {
        return res.status(403).json({ message: "Invalid token",error });
    }


}

module.exports = authenticateToken;