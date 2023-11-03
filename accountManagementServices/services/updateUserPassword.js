const bcrypt = require('bcrypt');

// Add Models
const Users = require('../models/userInfoModels');

// Email Service
const emailServices = require('../emailServices');

// Add User Logs Services
const userLogServices = require('../logServices');

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
                await Users.findByIdAndUpdate(id, {
                    password: encryptedPassword,
                    modifiedOn: Date.now(),
                    modifiedBy: payload.modifiedBy
                });

                const fullName = user.firstName + " " + user.lastName;
                emailServices.passwordUpdatedMail(user.emailId, fullName);

                userLogServices.requestSuccessLog({
                    logType: 'update-password-request',
                    code: 200,
                    message: 'SUCCESS',
                    responseMessage: 'User Updated',
                    requestBody: {
                        userId: id,
                        modifiedBy: payload.modifiedBy
                    },
                    response: null
                });
                return {code: 200, message: 'User updated'};
            } else {
                userLogServices.errorLog({
                    logType: 'update-password-request',
                    code: 400,
                    logDetails: 'The new password cannot be the same as the old password',
                    message: 'FAILED',
                    requestBody: {
                        userId: id,
                        modifiedBy: payload.modifiedBy
                    }
                });
                return {code: 400, message: 'The new password cannot be the same as the old password.'};
            }
        } else {
            userLogServices.errorLog({
                logType: 'update-password-request',
                code: 401,
                logDetails: 'Unauthorized user',
                message: 'FAILED',
                requestBody: {
                    userId: id,
                    modifiedBy: payload.modifiedBy
                }
            });
            return {code: 401, message: 'Unauthorized user'};
        }
    } else {
        userLogServices.errorLog({
            logType: 'update-password-request',
            code: 404,
            logDetails: 'User does not exist',
            message: 'FAILED',
            requestBody: {
                userId: id,
                modifiedBy: payload.modifiedBy
            }
        });
        return {code: 404, message: 'User does not exist'};
    }
}

module.exports = updateUserPassword;
