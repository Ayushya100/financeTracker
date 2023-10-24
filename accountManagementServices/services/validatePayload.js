// Adding Models
const User = require('../models/userInfoModels');

const validatePayload = (payload, type) => {
    let requestType = type;

    if (requestType === 'new-user') {
        return newUserValidation(payload);
    } else if (requestType === 'new-user-verification') {
        return newUserIdVerification(payload);
    } else if ((requestType === 'login-user') || (requestType === 'deactivate-user')) {
        return userLoginVerification(payload);
    } else if (requestType === 'validate-token') {
        return tokenVerification(payload);
    } else if (requestType === 'update-user') {
        return updateUserVerification(payload);
    } else if (requestType === 'update-password') {
        return updatePasswordVerification(payload);
    }
}

// New user payload validation
const newUserValidation = async(payload) => {
    const missingMsg = 'Required parameters are missing:';

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
    return {code: 200, message: 'Payload verified'};
}

// New user verification payload
const newUserIdVerification = async(id) => {
    if (!id) {
        return {code: 400, message: 'Required parameter missing: id'};
    }
    return {code: 200, message: 'Payload verified'};
}

// User login verification/deactivate payload
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
    return {code: 200, message: 'Payload verified'};
}

// Token verification payload
const tokenVerification = async(payload) => {
    const missingMsg = 'Required parameters are missing:';

    if (!payload.id) {
        return {code: 400, message: `${missingMsg} id`};
    } else if (!payload.token) {
        return {code: 401, message: `Unauthorized user`};
    }
    return {code: 200, message: 'Payload verified'};
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
    } else if (!payload.emailId) {
        message.message = `${missingMsg} emailId`;
        return message;
    } else if (!payload.modifiedBy) {
        message.message = `${missingMsg} modifiedBy`;
        return message;
    }
    return {code: 200, message: 'Payload verified'};
}

// Update user password payload
const updatePasswordVerification = async(payload) => {
    const message = {code: 400, message: ''};
    const missingMsg = 'Required parameters are missing: ';
    if (!payload.oldPassword) {
        message.message = `${missingMsg} oldPassword`;
        return message;
    } else if (!payload.newPassword) {
        message.message = `${missingMsg} newPassword`;
        return message;
    }
    return {code: 200, message: 'Payload verified'};
}

module.exports = validatePayload;
