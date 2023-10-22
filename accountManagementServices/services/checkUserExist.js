const User = require('../models/userInfoModels');

const validateUser = (payload, type) => {
    let requestType = type;

    if (requestType === 'new-user') {
        return newUserCheck(payload);
    }
}

// New User - user already exist or not
const newUserCheck = async(payload) => {
    let emailId = payload.emailId;
    let userName = payload.userName;
    const conflictMsg = 'already exist';

    if (await User.findOne({ emailId })) {
        return {code: 409, message: `EmailId ${conflictMsg}`};
    } else if (await User.findOne({ userName })) {
        return {code: 409, message: `Username ${conflictMsg}`};
    }
    return {code: 200, message: 'User verified'};
}

module.exports = validateUser;
