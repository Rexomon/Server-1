const jwt = require("jsonwebtoken");

const secretKey = "kuncipintusurga";

const encodeToken = (payload) => {
    return jwt.sign(payload, secretKey);
};

const verifyToken = (token) => {
    return jwt.verify(token, secretKey);
};

module.exports = { encodeToken, verifyToken };
