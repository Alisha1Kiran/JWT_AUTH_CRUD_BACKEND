const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
    // Get the tioken from the header
    const authHeader = req.header['authorization'];
    const token = authHeader && authHeader.split(" ")[1];

    // Check if token exists
    if (!token) return res.status(403).json({
        message: 'Access denied: No token provided'
    });

    try {
        // Verify token
        const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
        console.log("decoded: ", decodeToken);
        req.user = decodeToken; // Attach decoded user info to the request object

        //Move to the next middleware/route
        next();
    } catch (error) {
        return res.status(401).json({
            messsage: "Invalid Token"
        });
    }

}

module.exports = verifyToken;