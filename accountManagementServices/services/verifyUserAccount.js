// Adding Models
const User = require('../models/userInfoModels');

const emailServices = require('../emailServices');

const verifyUser = async(id, createdDate, verificationCode) => {
    const currentTime = Date.now();

    const verificationTime = Math.ceil((currentTime - createdDate) / (6 * 60 * 60 * 1000));
    const userInfo = await User.findById(id);

    if ((verificationTime <= 1) && (userInfo.verificationCode === verificationCode)) {
        userInfo.verificationCode = '';
        userInfo.isVerified = true;
        await User.findByIdAndUpdate(id, userInfo);

        emailServices.accountVerifiedMail(userInfo);
        return {code: 200, message: 'User verification completed successfully', fileToDisplay: 'accountVerified'};
    }

    return {code: 401, message: 'User verification failed', fileToDisplay: 'accountVerificationFailed'};
}

module.exports = verifyUser;
