// Adding Models
const User = require('../../models/userInfoModels');

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
    } else if (requestType === 'update-password') {
        return updatePasswordVerification(payload);
    } else if (requestType === 'deactivate-user') {
        return deactivateUserVerification(payload);
    } else if (requestType === 'request-password-reset') {
        return requestPasswordReset(payload);
    } else if (requestType === 'reset-password') {
        return resetPasswordValidation(payload);
    }
}

// New user payload validation
const newUserValidation = async(payload) => {
    const missingMsg = 'Required parameters are missing:';
    let payloadResult = {
        code: 200,
        message: 'Payload verified',
        type: 'SUCCESS',
        logType: 'create-user-request'
    };

    if (!payload.firstName || !payload.lastName || !payload.userName || !payload.emailId || !payload.password) {
        payloadResult.code = 400;
        payloadResult.type = 'FAILED';

        for (const param in payload) {
            if (!payload[param]) {
                payloadResult.message = `${missingMsg} ${param}`;
                break;
            }
        }
    }
    return payloadResult;
}

// New user verification payload
const newUserIdVerification = async(id) => {
    let payloadResult = {
        code: 200,
        message: 'Payload verified',
        type: 'SUCCESS',
        logType: 'user-verify-request'
    };

    if (!id) {
        payloadResult.code = 400;
        payloadResult.message = 'Required parameter missing: id';
        payloadResult.type = 'FAILED';
    }
    return payloadResult;
}

// User login verification/deactivate payload
const userLoginVerification = async(payload) => {
    const missingMsg = 'Required parameters are missing: ';
    let payloadResult = {
        code: 200,
        message: 'Payload verified',
        type: 'SUCCESS',
        logType: 'user-login-request'
    };

    if (!payload.userName || !payload.password) {
        payloadResult.code = 400;
        payloadResult.type = ' FAILED';

        for (const param in payload) {
            if (!payload[param]) {
                payloadResult.message = `${missingMsg} ${param}`;
                break;
            }
        }
    }
    return payloadResult;
}

// Token verification payload
const tokenVerification = async(payload) => {
    const missingMsg = 'Required parameters are missing:';
    let payloadResult = {
        code: 200,
        message: 'Payload verified',
        type: 'SUCCESS',
        logType: 'token-verify-request'
    };

    if (!payload.id) {
        payloadResult.code = 400;
        payloadResult.type = 'FAILED';
        payloadResult.message = `${missingMsg} id`;
    } else if (!payload.token) {
        payloadResult.code = 401;
        payloadResult.type = 'FAILED';
        payloadResult.message = `${missingMsg} Unauthorized user`;
    }
    return payloadResult;
}

// Update user details payload
const updateUserVerification = async(payload) => {
    const missingMsg = 'Required parameters are missing:';
    let payloadResult = {
        code: 200,
        message: 'Payload verified',
        type: 'SUCCESS',
        logType: 'update-user-request'
    };

    if (!payload.id || !payload.firstName || !payload.lastName || !payload.userName || !payload.emailId || !payload.modifiedBy) {
        payloadResult.code = 400;
        payloadResult.type = 'FAILED';

        for (const param in payload) {
            if (!payload[param]) {
                payloadResult.message = `${missingMsg} ${param}`;
                break;
            }
        }
    }
    return payloadResult;
}

// Update user password payload
const updatePasswordVerification = async(payload) => {
    const missingMsg = 'Required parameters are missing:';
    let payloadResult = {
        code: 200,
        message: 'Payload verified',
        type: 'SUCCESS',
        logType: 'update-password-request'
    };

    if (!payload.oldPassword || !payload.newPassword) {
        payloadResult.code = 400;
        payloadResult.type = 'FAILED';

        for (const param in payload) {
            if (!payload[param]) {
                payloadResult.message = `${missingMsg} ${param}`;
                break;
            }
        }
    }
    return payloadResult;
}

// Deactivate user payload
const deactivateUserVerification = async(payload) => {
    const missingMsg = 'Required parameters are missing:';
    let payloadResult = {
        code: 200,
        message: 'Payload verified',
        type: 'SUCCESS',
        logType: 'deactivate-user-request'
    };

    if (!payload.userName || !payload.password || !payload.modifiedBy) {
        payloadResult.code = 400;
        payloadResult.type = 'FAILED';

        for (const param in payload) {
            if (!payload[param]) {
                payloadResult.message = `${missingMsg} ${param}`;
                break;
            }
        }
    }
    return payloadResult;
}

// Request password reset for user
const requestPasswordReset = async(payload) => {
    let payloadResult = {
        code: 200,
        message: 'Payload verified',
        type: 'SUCCESS',
        logType: 'password-reset-request'
    };

    if (!payload.userName && !payload.emailId) {
        payloadResult.code = 400;
        payloadResult.type = 'FAILED';
        payloadResult.message = 'Mandatory parameters (Email Id or Username) are missing';
    }
    return payloadResult;
}

// Reset password for user
const resetPasswordValidation = async(payload) => {
    let payloadResult = {
        code: 200,
        message: 'Payload verified',
        type: 'SUCCESS',
        logType: 'reset-password-request'
    };

    if (!payload.newPassword && !payload.reEnteredPassword) {
        payloadResult.code = 400;
        payloadResult.type = 'FAILED';
        payloadResult.message = 'New Password and Reentered Password fields cannot be empty';
    }
    return payloadResult;
}

module.exports = validatePayload;
