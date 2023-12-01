// Add User Finance Model
const userFinance = require('../../models/userBasicFinanceModels');

// Add User Logs Services
const userLogServices = require('../../logServices');

const getUserFinanceInfo = async(userId) => {
    try {
        const user = await userFinance.findOne({userId: userId});

        if (user) {
            userLogServices.requestSuccessLog({
                logType: 'get-user-finance-request',
                code: 200,
                message: 'SUCCESS',
                responseMessage: 'User finance info retrieved',
                requestBody: {userId: userId},
                response: user
            });

            return {code: 200, message: user};
        }

        userLogServices.errorLog({
            logType: 'get-user-finance-request',
            code: 404,
            logDetails: 'User not found',
            message: 'FAILED',
            requestBody: {userId: userId}
        });
        return {code: 404, message: 'User not found'};
    } catch(err) {
        userLogServices.unknownError({
            logType: 'get-user-finance-request',
            code: 500,
            logDetails: err,
            requestBody: {userId: userId},
            message: 'FAILED'
        });
        return {code: 500, message: 'Some error occurred'};
    }
};

module.exports = getUserFinanceInfo;
