const jwt = require("jsonwebtoken");

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: "1h", // Token 有效期
    });
};

module.exports = generateToken;
