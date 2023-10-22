const User = require('../models/userInfoModels');

const validateUser = (payload, type) => {
    let requestType = type;

    if (requestType === 'new-user') {
        return newUserCheck(payload);
    } else if (requestType === 'new-user-verification') {
        return checkUserExistById(payload);
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

// Check if user exist in db with the id provided
const checkUserExistById = async(id) => {
    const userFound = await User.findById(id);

    if (!userFound) {
        return {code: 404, message: `Id ${id} invalid, user not found`};
    }
    return {code: 200, message: 'User exist'};
}

module.exports = validateUser;
