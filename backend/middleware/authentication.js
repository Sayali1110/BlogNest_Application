const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    
    try {
        const tokenVerification = jwt.verify(token, 'secret-code');
        console.log("token Verification", tokenVerification);
        req.email = tokenVerification.email;
        next();
    }

    catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }


}

module.exports = authenticateToken;