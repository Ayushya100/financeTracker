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

    let payloadResult = {
        code: 200,
        message: 'User verified',
        type: 'SUCCESS',
        logType: 'create-user-request'
    }

    if (await User.findOne({ emailId })) {
        payloadResult.code = 409;
        payloadResult.type = 'FAILED';
        payloadResult.message = `EmailId ${conflictMsg}`;
    } else if (await User.findOne({ userName })) {
        payloadResult.code = 409;
        payloadResult.type = 'FAILED';
        payloadResult.message = `Username ${conflictMsg}`;
    }
    return payloadResult;
}

// Check if user exist in db with the id provided
const checkUserExistById = async(id) => {
    let payloadResult = {
        code: 200,
        message: 'Payload verified',
        type: 'SUCCESS',
        logType: 'user-verify-request'
    };

    const userFound = await User.findById(id);

    if (!userFound) {
        payloadResult.code = 404;
        payloadResult.type = 'FAILED';
        payloadResult.message = `Id ${id} invalid, user not found`;
    }
    return payloadResult;
}

module.exports = validateUser;
