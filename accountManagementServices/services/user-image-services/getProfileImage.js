// Add User Image Model
const userImg = require('../../models/userImageModels');

// Add User Logs Services
const userLogServices = require('../../logServices');


const getProfileImage = async(userId) => {
    try {
        const user = await userImg.findOne({userId: userId});

        if (user) {
            userLogServices.requestSuccessLog({
                logType: 'get-profile-image-request',
                code: 200,
                message: 'SUCCESS',
                responseMessage: 'User profile Image retrieved',
                requestBody: {userId: userId},
                response: user
            });
            return {code: 200, message: 'User profile Image retrieved', response: {
                contentType: user.profileImage.contentType,
                data: user.profileImage.data
            }};
        }

        userLogServices.errorLog({
            logType: 'get-profile-image-request',
            code: 404,
            logDetails: 'User not found',
            message: 'FAILED',
            requestBody: {userId: userId}
        });
        return {code: 404, message: 'User not found'};
    } catch(err) {
        userLogServices.unknownError({
            logType: 'get-profile-image-request',
            code: 500,
            logDetails: err,
            requestBody: {userId: userId},
            message: 'FAILED'
        });
        return {code: 500, message: 'Some error occurred'};
    }
};

module.exports = getProfileImage;
