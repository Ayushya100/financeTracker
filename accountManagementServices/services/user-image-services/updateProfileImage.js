// Add User Image Model
const userImg = require('../../models/userImageModels');

// Add User Logs Services
const userLogServices = require('../../logServices');

const updateProfileImage = async(userId, profileImage) => {
    try {
        const user = await userImg.findOne({userId: userId});
    
        if (user) {
            user.profileImage.data = profileImage.buffer;
            user.profileImage.contentType = profileImage.mimetype;
            user.modifiedOn = Date.now();
            user.modifiedBy = userId;
            
            await user.save();

            userLogServices.requestSuccessLog({
                logType: 'update-profile-image-request',
                code: 201,
                message: 'SUCCESS',
                responseMessage: 'User profile Image updated successfully',
                requestBody: {userId: userId},
                response: null
            });
            return {code: 201, message: 'User profile Image updated successfully'};
        }

        userLogServices.errorLog({
            logType: 'update-profile-image-request',
            code: 404,
            logDetails: 'User not found',
            message: 'FAILED',
            requestBody: {userId: userId}
        });
        return {code: 404, message: 'User not found'};
    } catch(err) {
        userLogServices.unknownError({
            logType: 'update-profile-image-request',
            code: 500,
            logDetails: err,
            requestBody: {userId: userId},
            message: 'FAILED'
        })
        return {code: 500, message: 'Some error occurred'};
    }
};

module.exports = updateProfileImage;
