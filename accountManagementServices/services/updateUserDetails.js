// Add Models
const User = require('../models/userInfoModels');

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
            return {code: 201, message: 'User updated'};
        }
        return {code: 404, message: 'User not found'};
    } catch(err) {
        return {code: 500, message: `Error occurred while retrieving the user record from DB: ${err}`};
    }
};

module.exports = updateUserDetails;
