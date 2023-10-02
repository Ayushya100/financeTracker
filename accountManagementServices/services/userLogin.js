const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const emailServices = require('../emailServices');

// Add Models
const Users = require('../models/userInfoModels');

const userLogin = async(payload) => {
    const userName = payload.userName;
    const password = payload.password;
    const secretKey = process.env.JWT_SECRET_KEY;

    const user = await Users.findOne({ userName });

    if (user != null) {
        const isAuthenticated = await bcrypt.compare(password, user.password);
        if (isAuthenticated) {
            if (user.isVerified) {
                const token = jwt.sign({id: user._id, userName: user.userName}, secretKey, {expiresIn: '1h'});
                return {code: 200, message: {
                    id: user._id,
                    userName: user.userName,
                    token: token
                }};
            } else {
                user.verificationCode = emailServices.sendVerificationMail(user._id, user.emailId);
                await Users.findByIdAndUpdate(user._id, user);

                const infoToDisplay = '_id firstName lastName userName emailId createdOn isVerified verificationCode';
                const updatedUser = await Users.findById(user._id, infoToDisplay);
                return {code: 201, message: updatedUser};
            }
        } else {
            return {code: 403, message: 'Unauthorized user'};
        }
    } else {
        return {code: 404, message: 'User does not exist'};
    }
};

module.exports = userLogin;
