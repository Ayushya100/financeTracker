// Add Models
const User = require('../models/userInfoModels');

// Add User Logs Services
const userLogServices = require('../logServices');

const updateUserDetails = async(payload) => {
    try {
        const isUserAvailable = await User.findById(payload.id);
        if (isUserAvailable) {
            await User.findByIdAndUpdate(payload.id, {
                firstName: payload.firstName,
                lastName: payload.lastName,
                userName: payload.userName,
                emailId: payload.emailId,
                bio: payload.bio,
                gender: payload.gender,
                dob: payload.dob,
                occupation: payload.occupation,
                contactNumber: payload.contactNumber,
                modifiedOn: Date.now(),
                modifiedBy: payload.modifiedBy
            });

            userLogServices.requestSuccessLog({
                logType: 'update-user-request',
                code: 201,
                message: 'SUCCESS',
                responseMessage: 'User updated',
                requestBody: payload,
                response: null
            });
            return {code: 201, message: 'User updated'};
        }

        userLogServices.errorLog({
            logType: 'update-user-request',
            code: 404,
            logDetails: 'User not found',
            message: 'FAILED',
            requestBody: payload
        });
        return {code: 404, message: 'User not found'};
    } catch(err) {
        userLogServices.unknownError({
            logType: 'update-user-request',
            code: 500,
            logDetails: err,
            requestBody: payload,
            message: 'FAILED'
        });
        return {code: 500, message: `Error occurred while retrieving the user record from DB: ${err}`};
    }
};

module.exports = updateUserDetails;
