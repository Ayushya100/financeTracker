// Add User Image Model
const userImg = require('../../models/userImageModels');

// Add User Logs Services
const userLogServices = require('../../logServices');

const deleteProfileImage = async(userId) => {
    try {
        const user = await userImg.findOne({userId: userId});

        if (user) {
            user.profileImage.data = null;
            user.profileImage.contentType = null;
            user.modifiedOn = Date.now();
            user.modifiedBy = userId;

            await user.save();

            userLogServices.requestSuccessLog({
                logType: 'delete-profile-image-request',
                code: 201,
                message: 'SUCCESS',
                responseMessage: 'User profile Image deleted successfully',
                requestBody: {userId: userId},
                response: null
            });
            return {code: 201, message: 'User profile Image deleted successfully'};
        }

        userLogServices.errorLog({
            logType: 'delete-profile-image-request',
            code: 404,
            logDetails: 'User not found',
            message: 'FAILED',
            requestBody: {userId: userId}
        });
        return {code: 404, message: 'User not found'};
    } catch(err) {
        userLogServices.unknownError({
            logType: 'delete-profile-image-request',
            code: 500,
            logDetails: err,
            requestBody: {userId: userId},
            message: 'FAILED'
        });
        return {code: 500, message: 'Some error occurred'};
    }
}

module.exports = deleteProfileImage;
