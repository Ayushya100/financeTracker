const bcrypt = require('bcrypt');

// Add Models
const Users = require('../models/userInfoModels');

// Email Service
const emailServices = require('../emailServices');

const updateUserPassword = async(id, payload) => {
    const user = await Users.findById(id);

    if (user != null) {
        const validPassword = await bcrypt.compare(payload.oldPassword, user.password);
        
        if (validPassword) {
            const isNewPasswordSame = await bcrypt.compare(payload.newPassword, user.password);

            if (!isNewPasswordSame) {
                const newPassword = payload.newPassword;
                const saltRounds = 10;
    
                const encryptedPassword = await bcrypt.hash(newPassword, saltRounds);
                await Users.findByIdAndUpdate(id, {password: encryptedPassword});

                const fullName = user.firstName + " " + user.lastName;
                emailServices.passwordUpdatedMail(user.emailId, fullName);
                return {code: 200, message: 'User updated'};
            } else {
                return {code: 400, message: 'The new password cannot be the same as the old password.'};
            }
        } else {
            return {code: 401, message: 'Unauthorized user'};
        }
    } else {
        return {code: 404, message: 'User does not exist'};
    }
}

module.exports = updateUserPassword;
