// Adding Models
const User = require('../models/userInfoModels');

// Email Service
const emailServices = require('../emailServices');

// Add User Logs Services
const userLogServices = require('../logServices');

const verifyUser = async(id, createdDate, verificationCode) => {
    const currentTime = Date.now();

    const verificationTime = Math.ceil((currentTime - createdDate) / (6 * 60 * 60 * 1000));
    const userInfo = await User.findById(id);

    if ((verificationTime <= 1) && (userInfo.verificationCode === verificationCode)) {
        userInfo.verificationCode = '';
        userInfo.isVerified = true;
        userInfo.modifiedOn = Date.now();
        await User.findByIdAndUpdate(id, userInfo);

        emailServices.accountVerifiedMail(userInfo);

        userLogServices.requestSuccessLog({
            logType: 'user-verify-request',
            code: 200,
            message: 'SUCCESS',
            responseMessage: 'User Verified Successfully',
            requestBody: {
                userId: id,
                createdDate: createdDate,
                verificationCode: verificationCode
            },
            response: null
        });
        return {code: 200, message: 'User verification completed successfully', fileToDisplay: 'accountVerified'};
    }

    userLogServices.errorLog({
        logType: 'user-verify-request',
        code: 401,
        logDetails: 'User verification failed',
        message: 'FAILED',
        requestBody: {
            userId: id,
            createdDate: createdDate,
            verificationCode: verificationCode
        }
    });
    return {code: 401, message: 'User verification failed', fileToDisplay: 'accountVerificationFailed'};
}

module.exports = verifyUser;
