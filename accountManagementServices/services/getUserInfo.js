// Add Models
const User = require('../models/userInfoModels');

// Add User Logs Services
const userLogServices = require('../logServices');

const getUserInfo = async(id) => {
    const infoToDisplay = '_id firstName lastName userName bio gender dob occupation emailId contactNumber createdOn lastLogin loginCount';
    try {
        const userDetails = await User.findById(id, infoToDisplay);

        userLogServices.requestSuccessLog({
            logType: 'get-user-info-request',
            code: 200,
            message: 'SUCCESS',
            responseMessage: 'User Details Found in DB',
            requestBody: {
                userId: id
            },
            response: userDetails
        });
        return {code: 200, message: userDetails};
    } catch(err) {
        userLogServices.unknownError({
            logType: 'get-user-info-request',
            code: 500,
            logDetails: err,
            requestBody: { userId: id },
            message: 'FAILED'
        });
        return {code: 500, message: err};
    }
}

module.exports = getUserInfo;
