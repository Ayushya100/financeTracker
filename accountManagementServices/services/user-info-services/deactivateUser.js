const bcrypt = require('bcrypt');

// Models
const Users = require('../../models/userInfoModels');

// Email Service
const emailServices = require('../../emailServices');

// Add User Logs Services
const userLogServices = require('../../logServices');

const deactivateUser = async(id, payload) => {
    const userName = payload.userName;
    const password = payload.password;
    const modifiedBy = payload.modifiedBy;

    const requiredUser = await Users.findById(id);

    if (requiredUser) {
        const isAuthenticated = await bcrypt.compare(password, requiredUser.password);

        if (isAuthenticated && (userName === requiredUser.userName)) {
            await Users.findByIdAndUpdate(id, {
                isDeleted: true,
                modifiedOn: Date.now(),
                modifiedBy: modifiedBy
            });

            const infoToDisplay = '_id firstName lastName userName emailId modifiedOn modifiedBy lastLogin isDeleted';
            const updatedUser = await Users.findById(id, infoToDisplay);

            const modifiedOn = updatedUser.modifiedOn;
            emailServices.accountDeactivatedMail({
                emailId: updatedUser.emailId,
                fullName: updatedUser.firstName + " " + updatedUser.lastName,
                dateOfDeactivation: modifiedOn.toDateString(),
                reactivationTimeline: new Date(modifiedOn.setDate(modifiedOn.getDate() + 30)).toDateString()
            });

            userLogServices.requestSuccessLog({
                logType: 'deactivate-user-request',
                code: 200,
                message: 'SUCCESS',
                responseMessage: 'User Deactivated Successfully',
                requestBody: {
                    userId: id,
                    userName: userName,
                    modifiedBy: modifiedBy
                },
                response: updatedUser
            });
            return {code: 200, message: updatedUser};
        } else {
            userLogServices.errorLog({
                logType: 'deactivate-user-request',
                code: 401,
                logDetails: 'Unauthorized User',
                message: 'FAILED',
                requestBody: {
                    userId: id,
                    userName: userName,
                    modifiedBy: modifiedBy
                }
            });
            return {code: 401, message: 'Unauthorized User'};
        }
    } else {
        userLogServices.errorLog({
            logType: 'deactivate-user-request',
            code: 404,
            logDetails: 'User does not exist',
            message: 'FAILED',
            requestBody: {
                userId: id,
                userName: userName,
                modifiedBy: modifiedBy
            }
        });
        return {code: 404, message: 'User does not exist'};
    }
}

module.exports = deactivateUser;
