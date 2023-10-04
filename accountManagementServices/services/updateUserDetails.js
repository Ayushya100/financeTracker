// Add Models
const User = require('../models/userInfoModels');

const services = require('./index');

const updateUserDetails = async(payload) => {
    try {
        const isUserAvailable = await User.findById(payload.id);
        if (isUserAvailable) {
            await User.findByIdAndUpdate(payload.id, {
                firstName: payload.firstName,
                lastName: payload.lastName,
                userName: payload.userName,
                bio: payload.bio,
                gender: payload.gender,
                dob: payload.dob,
                occupation: payload.occupation,
                contactNumber: payload.contactNumber,
                emailId: payload.emailId,
                modifiedOn: Date.now()
            });
            return {code: 200, message: 'User updated'};
        }
    } catch(err) {
        return {code: 404, message: 'User not found'};
    }
};

module.exports = updateUserDetails;
