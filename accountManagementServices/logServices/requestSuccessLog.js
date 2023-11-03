// Add User Logs Model
const userLogs = require('../models/userLogs');

// API Details
const apiDetail = require('../apiDetails.json');

const requestSuccessLog = async(payloadValidationResult) => {
    let logPayload = {
        logType: payloadValidationResult.logType,
        logDetails: {
            APIStatus: payloadValidationResult.code,
            message: payloadValidationResult.responseMessage,
            requestBody: payloadValidationResult.requestBody,
            response: payloadValidationResult.response,
            step: 'REQUEST SUCCESS'
        },
        message: payloadValidationResult.message,
        apiDetail: apiDetail.apiDetails[payloadValidationResult.logType]
    };

    const logs = new userLogs(logPayload);
    await logs.save();
};

module.exports = requestSuccessLog;
