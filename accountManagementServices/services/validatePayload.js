// Adding Models
const User = require('../models/userInfoModels');

const validatePayload = (payload, type) => {
    let requestType = type;

    if (requestType === 'new-user') {
        return newUserValidation(payload);
    } else if (requestType === 'new-user-verification') {
        return newUserIdVerification(payload);
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

module.exports = validatePayload;
