// Add Models
const userFinance = require('../../models/userBasicFinanceModels');

// Add User Logs Services
const userLogServices = require('../../logServices');

const updateUserFinanceInfo = async(payload) => {
    try {
        const isUserAvailable = await userFinance.findOne({userId: payload.userId});
        if (isUserAvailable) {
            await userFinance.findByIdAndUpdate(isUserAvailable._id, {
                availableFunds: payload.availableFunds,
                lifetimeIncome: payload.lifetimeIncome,
                lifetimeInvestment: payload.lifetimeInvestment,
                lifetimeExpenditure: payload.lifetimeExpenditure,
                modifiedOn: Date.now(),
                modifiedBy: payload.userId
            });
    
            userLogServices.requestSuccessLog({
                logType: 'update-user-finance-request',
                code: 201,
                message: 'SUCCESS',
                responseMessage: 'User Finance updated',
                requestBody: payload,
                response: null
            });
            return {code: 201, message: 'User updated'};
        }

        userLogServices.errorLog({
            logType: 'update-user-finance-request',
            code: 404,
            logDetails: 'User not found',
            message: 'FAILED',
            requestBody: payload
        });
        return {code: 404, message: 'User not found'};
    } catch(err) {
        userLogServices.unknownError({
            logType: 'update-user-finance-request',
            code: 500,
            logDetails: err,
            requestBody: payload,
            message: 'FAILED'
        });
        return {code: 500, message: `Error occurred while retrieving the user record from DB: ${err}`};
    }
};

module.exports = updateUserFinanceInfo;
