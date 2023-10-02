const jwt = require('jsonwebtoken');

const validateToken = async(payload) => {
    const secretKey = process.env.JWT_SECRET_KEY;
    try {
        const decoded = jwt.verify(payload.token, secretKey);
        console.log(decoded);
        return {message: 'valid', result: decoded};
    } catch(err) {
        return {message: 'TokenExpiredError', result: err};
    }
};

module.exports = validateToken;
