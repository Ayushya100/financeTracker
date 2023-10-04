// Adding Models
const User = require('../models/userInfoModels');

const validatePayload = (payload, type) => {
    let requestType = type;

    if (requestType === 'new-user') {
        return newUserValidation(payload);
    } else if (requestType === 'new-user-verification') {
        return newUserIdVerification(payload);
    } else if (requestType === 'login-user') {
        return userLoginVerification(payload);
    } else if (requestType === 'validate-token') {
        return tokenVerification(payload);
    } else if (requestType === 'update-user') {
        return updateUserVerification(payload);
    }
}

// New user payload validation
const newUserValidation = async(payload) => {
    const missingMsg = 'Required parameters are missing:';
    const conflictMsg = 'already exist';

    if (!payload.firstName) {
        return {code: 400, message: `${missingMsg} FirstName`};
    } else if (!payload.lastName) {
        return {code: 400, message: `${missingMsg} LastName`};
    } else if (!payload.userName) {
        return {code: 400, message: `${missingMsg} UserName`};
    } else if (!payload.emailId) {
        return {code: 400, message: `${missingMsg} EmailId`};
    } else if (!payload.password) {
        return {code: 400, message: `${missingMsg} Password`};
    }
    else {
        let emailId = payload.emailId;
        let userName = payload.userName;

        if (await User.findOne({ emailId })) {
            return {code: 409, message: `EmailId ${conflictMsg}`};
        } else if (await User.findOne({ userName })) {
            return {code: 409, message: `UserName ${conflictMsg}`};
        }
        return true;
    }
}

// New user verification payload
const newUserIdVerification = async(id) => {
    const userFound = await User.findById(id);

    if(!userFound) {
        return {code: 404, message: `Id (${id}) invalid, user not found`};
    }
    return true;
}

// User login verification payload
const userLoginVerification = async(payload) => {
    const message = {code: 400, message: ''};
    const missingMsg = 'Required parameters are missing: ';
    if (!payload.userName) {
        message.message = `${missingMsg} UserName`;
        return message;
    } else if (!payload.password) {
        message.message = `${missingMsg} Password`;
        return message;
    }
    return true;
}

// Token verification payload
const tokenVerification = async(payload) => {
    const missingMsg = 'Required parameters are missing:';

    if (!payload.id) {
        return {code: 400, message: `${missingMsg} id`};
    } else if (!payload.token) {
        return {code: 401, message: `Unauthorized user`};
    }
    return true;
}

// Update user details payload
const updateUserVerification = async(payload) => {
    const message = {code: 400, message: ''};
    const missingMsg = 'Required parameters are missing: ';
    if (!payload.id) {
        message.message = `${missingMsg} id`;
        return message;
    } else if (!payload.firstName) {
        message.message = `${missingMsg} firstName`;
        return message;
    } else if (!payload.lastName) {
        message.message = `${missingMsg} lastName`;
        return message;
    } else if (!payload.userName) {
        message.message = `${missingMsg} userName`;
        return message;
    }
    return true;
}

module.exports = validatePayload;
