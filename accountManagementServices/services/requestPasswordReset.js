const {v4: uuidv4} = require('uuid');

// Add user model
const User = require('../models/userInfoModels');

// Email service
const emailServices = require('../emailServices');

// Add User Logs Services
const userLogServices = require('../logServices');

const requestPasswordReset = async(payload) => {
    try {
        const infoToDisplay = '_id firstName lastName userName emailId createdOn lastLogin';
        const isUserAvailable = await User.findOne(payload, infoToDisplay);

        if (isUserAvailable) {
            const custId = isUserAvailable._id
            const uniqueString = uuidv4() + custId;
            const verificationCode = 'RESET_PASSWORD:' + custId + ':' + Date.now() + ':' + uniqueString;
            
            await User.findByIdAndUpdate(custId, { verificationCode });

            const updatedUser = await User.findById(custId, '_id firstName lastName userName emailId verificationCode');

            emailServices.requestPasswordResetMail({
                emailId: updatedUser.emailId,
                fullName: updatedUser.firstName + " " + updatedUser.lastName,
                verificationLink: updatedUser.verificationCode
            });

            userLogServices.requestSuccessLog({
                logType: 'password-reset-request',
                code: 201,
                message: 'SUCCESS',
                responseMessage: 'Password Reset Request',
                requestBody: payload,
                response: {
                    userId: updatedUser._id,
                    firstName: updatedUser.firstName,
                    lastName: updatedUser.lastName,
                    userName: updatedUser.userName,
                    emailId: updatedUser.emailId
                }
            });
            return {code: 201, message: updatedUser};
        }

        userLogServices.errorLog({
            logType: 'password-reset-request',
            code: 404,
            logDetails: 'User not found',
            message: 'FAILED',
            requestBody: payload
        });
        return {code: 404, message: 'User not found'};
    } catch(err) {
        userLogServices.unknownError({
            logType: 'password-reset-request',
            code: 500,
            logDetails: err,
            requestBody: payload,
            message: 'FAILED'
        });
        return {code: 500, message: `Error occurred while retrieving the user record from DB: ${err}`};
    }
};

module.exports = requestPasswordReset;
