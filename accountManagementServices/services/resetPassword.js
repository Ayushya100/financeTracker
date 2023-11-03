const bcrypt = require('bcrypt');

// Add User Model
const User = require('../models/userInfoModels');

// Email Services
const emailServices = require('../emailServices');

// Add User Logs Services
const userLogServices = require('../logServices');

const resetPassword = async(payload, verificationCode) => {
    const verificationResult = verificationCode.split(":");
    const userId = verificationResult[1];
    const codeCreationTime = verificationResult[2];

    const infoToDisplay = '_id firstName lastName userName emailId password verificationCode';
    const isUserFound = await User.findById(userId, infoToDisplay);

    if (payload.newPassword === payload.reEnteredPassword) {
        if (isUserFound) {
            const currentTime = Date.now();
            const verificationTime = Math.ceil((currentTime - codeCreationTime) / (30 * 60 * 1000));
            
            if ((verificationTime <= 1) && (verificationCode === isUserFound.verificationCode)) {
                const saltRounds = 10;
                const password = await bcrypt.hash(payload.newPassword, saltRounds);
                
                await User.findByIdAndUpdate(userId, {
                    isDeleted: false,
                    password: password,
                    verificationCode: '',
                    modifiedOn: Date.now(),
                    modifiedBy: 'SYSTEM_RESET_USER_REQUEST'
                });

                const fullName = isUserFound.firstName + " " + isUserFound.lastName;
                emailServices.passwordUpdatedMail(isUserFound.emailId, fullName);

                userLogServices.requestSuccessLog({
                    logType: 'reset-password-request',
                    code: 201,
                    message: 'SUCCESS',
                    responseMessage: 'Password Reset Successfully',
                    requestBody: {
                        userId: userId,
                        verificationCodeCreationTime: codeCreationTime
                    },
                    response: null
                });
                return {code: 201, message: 'Password Reset successfully'};
            } else {
                userLogServices.errorLog({
                    logType: 'reset-password-request',
                    code: 409,
                    logDetails: 'Verification Code Expired',
                    message: 'FAILED',
                    requestBody: {
                        userId: userId,
                        verificationCodeCreationTime: codeCreationTime
                    }
                });
                return {code: 409, message: 'Verification Code Expired.'}
            }
        } else {
            userLogServices.errorLog({
                logType: 'reset-password-request',
                code: 404,
                logDetails: 'User not found',
                message: 'FAILED',
                requestBody: {
                    userId: userId,
                    verificationCodeCreationTime: codeCreationTime
                }
            });
            return {code: 404, message: 'User not found'};
        }
    } else {
        userLogServices.errorLog({
            logType: 'reset-password-request',
            code: 400,
            logDetails: 'Password does not matched',
            message: 'FAILED',
            requestBody: {
                userId: userId,
                verificationCodeCreationTime: codeCreationTime
            }
        });
        return {code: 400, message: 'Password does not matched'};
    }
};

module.exports = resetPassword;
